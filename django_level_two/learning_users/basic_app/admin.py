from django.contrib import admin

from basic_app.models import UserProfileInfo, Question, Answer


# Register your models here.
admin.site.register(UserProfileInfo)
admin.site.register(Question)
admin.site.register(Answer)