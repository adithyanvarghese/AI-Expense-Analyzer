from django.contrib.auth.models import User
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        username = validated_data["username"].strip().lower()
        email = validated_data["email"].strip().lower()
        user = User.objects.create_user(
            username=username,
            email=email,
            password=validated_data["password"],
        )

        return user