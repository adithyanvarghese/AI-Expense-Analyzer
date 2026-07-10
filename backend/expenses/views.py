from datetime import date

import pandas as pd

from django.db.models import Sum, Max

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Expense, Budget
from .serializers import ExpenseSerializer, BudgetSerializer

# ==========================
# AI Modules
# ==========================
from .ai.financial_advisor import generate_financial_advice
from ml.predict import predict_category_with_confidence
from .ai.receipt_analyzer import analyze_receipt

# ==========================
# Service Modules
# ==========================
from .services.ocr_service import extract_text
from .services.statement_parser import parse_csv

# ML

from ml.feedback import save_feedback

from ml.keyword_classifier import classify_by_keyword


# ======================================================
# GET ALL EXPENSES / ADD EXPENSE
# ======================================================
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def expenses(request):

    if request.method == "GET":

        expenses = Expense.objects.filter(user=request.user)

        serializer = ExpenseSerializer(expenses, many=True)

        return Response(serializer.data)

    elif request.method == "POST":

        serializer = ExpenseSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# ======================================================
# UPDATE / DELETE EXPENSE
# ======================================================
@api_view(["PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def expense_detail(request, pk):

    try:

        expense = Expense.objects.get(
            pk=pk,
            user=request.user
        )

    except Expense.DoesNotExist:

        return Response(
            {"error": "Expense not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "PUT":

        serializer = ExpenseSerializer(
            expense,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == "DELETE":

        expense.delete()

        return Response(
            {"message": "Expense deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )


# ======================================================
# CSV UPLOAD
# ======================================================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_csv(request):

    if "file" not in request.FILES:

        return Response(
            {"error": "No file uploaded"},
            status=status.HTTP_400_BAD_REQUEST
        )

    file = request.FILES["file"]

    df = pd.read_csv(file)

    for _, row in df.iterrows():

        Expense.objects.create(
            user=request.user,
            date=row["date"],
            category=row["category"],
            amount=row["amount"],
            description=row["description"],
        )

    return Response(
        {
            "message": "CSV uploaded successfully"
        }
    )


# ======================================================
# AI ANALYSIS
# ======================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def ai_analysis(request):

    expenses = Expense.objects.filter(user=request.user)

    if not expenses.exists():

        return Response({
            "analysis": "No expenses found."
        })

    total = 0
    category_totals = {}

    for expense in expenses:

        amount = float(expense.amount)

        total += amount

        category = expense.category

        category_totals[category] = (
            category_totals.get(category, 0) + amount
        )

    highest_category = max(
        category_totals,
        key=category_totals.get
    )

    highest_amount = category_totals[highest_category]

    potential_savings = round(
        highest_amount * 0.20,
        2
    )

    prompt = f"""
You are an expert AI Financial Advisor.

Analyze the following expense data.

Total Expense:
₹{total}

Category Breakdown:
{category_totals}

Generate:

1. Financial Health Score (out of 100)

2. Spending Summary

3. Biggest Spending Category

4. Three Personalized Saving Tips

5. Budget Recommendation

6. Investment Suggestion

7. Final Conclusion

Keep the response under 250 words.
"""

    ai_response = generate_financial_advice(prompt)

    return Response({

        "analysis": ai_response,

        "total_expense": total,

        "highest_category": highest_category,

        "highest_amount": highest_amount,

        "potential_savings": potential_savings

    })
    # -------------------------
    # FALLBACK RESPONSE
    # -------------------------

    if ai_response is None:

        ai_response = f"""
📊 Financial Summary

• Total Expense : ₹{total}

• Highest Spending Category : {highest_category}

• Amount Spent : ₹{highest_amount}

• Potential Monthly Savings : ₹{potential_savings}

💡 Recommendation

You spend most of your money on '{highest_category}'.

Reducing this category by around 20% could save approximately ₹{potential_savings} every month.

Track unnecessary purchases, set a monthly budget, and consider investing your savings in a SIP or emergency fund.
"""

    return Response({

        "analysis": ai_response,

        "total_expense": total,

        "highest_category": highest_category,

        "highest_amount": highest_amount,

        "potential_savings": potential_savings

    })

# ======================================================
# DASHBOARD SUMMARY
# ======================================================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_summary(request):

    expenses = Expense.objects.filter(user=request.user)

    total_expense = (
        expenses.aggregate(
            total=Sum("amount")
        )["total"] or 0
    )

    highest_expense = (
        expenses.aggregate(
            highest=Max("amount")
        )["highest"] or 0
    )

    total_categories = (
        expenses.values("category")
        .distinct()
        .count()
    )

    today = date.today()

    monthly_expense = (
        expenses.filter(
            date__year=today.year,
            date__month=today.month
        ).aggregate(
            total=Sum("amount")
        )["total"] or 0
    )

    return Response({

        "total_expense": total_expense,

        "highest_expense": highest_expense,

        "total_categories": total_categories,

        "monthly_expense": monthly_expense,

    })
    # ======================================================
# CHART DATA
# ======================================================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def chart_data(request):

    expenses = Expense.objects.filter(user=request.user)

    category_totals = (
        expenses
        .values("category")
        .annotate(total=Sum("amount"))
        .order_by("-total")
    )

    pie_chart = []

    for item in category_totals:

        pie_chart.append({
            "name": item["category"],
            "value": float(item["total"])
        })

    monthly_total = (
        expenses
        .values("date__month")
        .annotate(total=Sum("amount"))
        .order_by("date__month")
    )

    months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]

    bar_chart = []

    for item in monthly_total:

        month = item["date__month"]

        bar_chart.append({
            "month": months[month],
            "expense": float(item["total"])
        })

    return Response({

        "pie_chart": pie_chart,

        "bar_chart": bar_chart

    })

# ======================================================
# GET / ADD BUDGET
# ======================================================

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def budgets(request):

    if request.method == "GET":

        budgets = Budget.objects.filter(user=request.user)

        serializer = BudgetSerializer(
            budgets,
            many=True
        )

        return Response(serializer.data)

    serializer = BudgetSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save(user=request.user)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# ======================================================
# DELETE BUDGET
# ======================================================

@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def budget_detail(request, pk):

    try:
        budget = Budget.objects.get(
            id=pk,
            user=request.user
        )

    except Budget.DoesNotExist:

        return Response(
            {"error": "Budget not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # -------------------------
    # GET
    # -------------------------
    if request.method == "GET":

        serializer = BudgetSerializer(budget)

        return Response(serializer.data)

    # -------------------------
    # UPDATE
    # -------------------------
    elif request.method == "PUT":

        serializer = BudgetSerializer(
            budget,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save(user=request.user)

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # -------------------------
    # DELETE
    # -------------------------
    elif request.method == "DELETE":

        budget.delete()

        return Response(
            {"message": "Budget deleted successfully."},
            status=status.HTTP_200_OK
        )
# Budget tracket

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def budget_status(request):

    budgets = Budget.objects.filter(user=request.user)

    result = []

    for budget in budgets:

        spent = (
            Expense.objects.filter(
                user=request.user,
                category=budget.category
            ).aggregate(
                total=Sum("amount")
            )["total"] or 0
        )

        spent = float(spent)
        limit = float(budget.monthly_budget)

        remaining = limit - spent

        percentage = round((spent / limit) * 100, 2) if limit > 0 else 0

        if spent > limit:
            status = "Over Budget"
        elif percentage >= 80:
            status = "Near Limit"
        else:
            status = "Within Budget"

        result.append({
            "id": budget.id,
            "category": budget.category,
            "budget": limit,
            "spent": spent,
            "remaining": remaining,
            "percentage": percentage,
            "status": status,
        })

    return Response(result)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def predict_expense_category(request):

    description = request.data.get("description")

    if not description:
        return Response(
            {"error": "Description is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Step 1: Keyword Classification
    category = classify_by_keyword(description)

    if category is not None:

        confidence = 100

    else:

        # Step 2: ML Prediction
        category, confidence = predict_category_with_confidence(description)

        if confidence < 80:
            category = "Others"

    return Response({
        "description": description,
        "predicted_category": category,
        "confidence": confidence
    })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def scan_receipt(request):

    if "file" not in request.FILES:
        return Response(
            {"error": "No image uploaded"},
            status=status.HTTP_400_BAD_REQUEST
        )

    image = request.FILES["file"]

    # OCR
    receipt_text = extract_text(image)

    if not receipt_text.strip():
        return Response(
            {"error": "Unable to read receipt"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Gemini Extraction
    receipt_data = analyze_receipt(receipt_text)

    # Hybrid Classification
    description = receipt_data.get("description", "")

    category = classify_by_keyword(description)

    if category is not None:

        confidence = 100

    else:

        category, confidence = predict_category_with_confidence(description)

        if confidence < 80:
            category = "Others"

    # Override Gemini category
    receipt_data["category"] = category
    receipt_data["confidence"] = confidence

    return Response({
        "ocr_text": receipt_text,
        "receipt": receipt_data
    })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_statement(request):

    if "file" not in request.FILES:
        return Response(
            {"error": "No file uploaded"},
            status=status.HTTP_400_BAD_REQUEST
        )

    file = request.FILES["file"]

    try:
        transactions = parse_csv(file)

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

    imported = 0
    skipped = 0

    for transaction in transactions:

        # ----------------------------------------
        # Skip duplicate transactions
        # ----------------------------------------
        if Expense.objects.filter(
            user=request.user,
            date=transaction["date"],
            amount=transaction["amount"],
            description=transaction["description"]
        ).exists():

            skipped += 1
            continue

        # ----------------------------------------
        # Use CSV category if available
        # Otherwise predict using ML
        # ----------------------------------------
        csv_category = str(transaction.get("category", "")).strip()

        if csv_category != "" and csv_category.lower() != "nan":

            category = csv_category

        else:

            category = classify_by_keyword(transaction["description"])

            if category is None:

                category, confidence = predict_category_with_confidence(
                    transaction["description"]
                )

                if confidence < 80:
                    category = "Others"

            else:

                confidence = 100

        # ----------------------------------------
        # Save expense
        # ----------------------------------------
        Expense.objects.create(
            user=request.user,
            date=transaction["date"],
            category=category,
            amount=transaction["amount"],
            description=transaction["description"]
        )

        imported += 1

    return Response({
        "message": "Statement imported successfully",
        "transactions_imported": imported,
        "duplicates_skipped": skipped
    })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def expense_feedback(request):

    description = request.data.get("description")
    category = request.data.get("category")

    if not description or not category:

        return Response(
            {"error": "Missing data"},
            status=400
        )

    save_feedback(
        description,
        category
    )

    return Response({

        "message": "Feedback saved successfully."

    })