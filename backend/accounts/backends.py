from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

User = get_user_model()


class CaseInsensitiveModelBackend(ModelBackend):
    """
    Custom authentication backend that allows case-insensitive authentication
    using either username or email, and automatically strips leading/trailing whitespace.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(User.USERNAME_FIELD)

        if not username or not password:
            return None

        clean_username = username.strip()

        try:
            user = User.objects.get(username__iexact=clean_username)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email__iexact=clean_username)
            except (User.DoesNotExist, User.MultipleObjectsReturned):
                return None
        except User.MultipleObjectsReturned:
            user = User.objects.filter(username__iexact=clean_username).first()

        if user and user.check_password(password) and self.user_can_authenticate(user):
            return user

        return None
