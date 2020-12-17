"""learning_users URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from basic_app.views import user_logout,index,user_login,register,update_answer,videos,welcome,view_userdetails
from django.conf.urls import url
from django.urls import path,include
from django.conf.urls.static import  static
from django.conf import settings


urlpatterns = [
    path(r'', welcome, name='welcome'),
    path(r'admin/', admin.site.urls),
    path(r'logout/', user_logout, name='logout'),
    path(r'login/',user_login,name='user_login'),
    path(r'register/',register,name='register'),
    path(r'update_answer/',update_answer,name='update_answer'),
    path(r'videos/',videos,name='videos'),
    path(r'question/',index,name='index'),
    path(r'account/<int:user_id>/',view_userdetails)
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
