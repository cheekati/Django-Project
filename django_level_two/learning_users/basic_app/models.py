from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class UserProfileInfo(models.Model):
	GENDER_CHOICES = (
	('Male','Male'),
	('Female','Female'),
	('Other','Other'),
	)
	user = models.OneToOneField(User,on_delete=models.CASCADE)
	portfolio_site = models.CharField(blank=True,null=True,max_length=200)
	profile_pic = models.ImageField(blank=True,null=True)
	gender = models.CharField(choices=GENDER_CHOICES,max_length=20,null=True,blank=True)
	age = models.IntegerField(null=True,blank=True)
	ethnicity = models.CharField(max_length=50,null=True,blank=True)
	text = models.CharField(max_length=500,null=True,blank=True)
	is_tai_chyi = models.BooleanField(default=False)
	def __str__(self):
	    return self.user.username


class Question(models.Model):
	question_text = models.CharField(max_length=500)

class Answer(models.Model):
	ANSWER_CHOICES = (
		('1','None of the time'),
		('2','Rarely'),
		('3','Some of the time'),
		('4','Often'),
		('5','All of the time'),
		)
	question = models.ForeignKey(Question,on_delete=models.CASCADE)
	answer = models.CharField(max_length=20,choices=ANSWER_CHOICES,null=True,blank=True)
	is_answered = models.BooleanField(default=False)
	user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)

