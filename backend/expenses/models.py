from django.db import models
from django.contrib.auth.models import User


class Expense(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    date = models.DateField()

    category = models.CharField(max_length=100)

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.category} - ₹{self.amount}"
    
class Budget(models.Model):

    user = models.ForeignKey(
        "auth.User",
        on_delete=models.CASCADE
    )

    category = models.CharField(max_length=100)

    monthly_budget = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.category}"