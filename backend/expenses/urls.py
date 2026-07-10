from django.urls import path
from . import views

urlpatterns = [

    path("", views.expenses),

    path("<int:pk>/", views.expense_detail),

    path("upload/", views.upload_csv),

    path("dashboard/", views.dashboard_summary),

    path("chart-data/", views.chart_data),

    path("ai-analysis/", views.ai_analysis),

    # Budget APIs
    path("budgets/", views.budgets),

    path("budgets/<int:pk>/", views.budget_detail),

    path("budget-status/", views.budget_status),

    path(
    "predict-category/",views.predict_expense_category),

    path("scan-receipt/", views.scan_receipt),

    path("upload-statement/", views.upload_statement),

    path("feedback/", views.expense_feedback),

]