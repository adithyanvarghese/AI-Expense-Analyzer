from django.test import TestCase
from django.contrib.auth import get_user_model, authenticate
from rest_framework.test import APIClient

User = get_user_model()


class CaseInsensitiveAuthTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="john_doe",
            email="john@example.com",
            password="SecurePassword123!"
        )
        self.client = APIClient()

    def test_case_insensitive_username_login(self):
        user = authenticate(username="John_Doe", password="SecurePassword123!")
        self.assertIsNotNone(user)
        self.assertEqual(user.username, "john_doe")

    def test_whitespace_username_login(self):
        user = authenticate(username=" john_doe  ", password="SecurePassword123!")
        self.assertIsNotNone(user)
        self.assertEqual(user.username, "john_doe")

    def test_email_login(self):
        user = authenticate(username="JOHN@EXAMPLE.COM", password="SecurePassword123!")
        self.assertIsNotNone(user)
        self.assertEqual(user.username, "john_doe")

    def test_login_api_case_insensitive(self):
        response = self.client.post("/api/accounts/login/", {
            "username": "John_Doe ",
            "password": "SecurePassword123!"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
