from django.shortcuts import render
from basic_app.forms import UserForm,UserProfileInfoForm
from django.contrib.auth import authenticate,login,logout
from django.http import HttpResponseRedirect,HttpResponse
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from basic_app.models import Question, Answer, UserProfileInfo
from basic_app.handlers import send_email
from django.template.loader import get_template
import json

# Create your views here.
def index(request):
    answers = Answer.objects.filter(user=request.user)
    question_count = Question.objects.all().count()
    if answers.count() != question_count:
        questions = Question.objects.all()
        for question in questions:
            try:
                answer = Answer.objects.get(question=question,user=request.user)
            except:
                answer = Answer()
                answer.question = question
                answer.user = request.user
                answer.save()

    answer = Answer.objects.filter(user=request.user,is_answered=False,question__question_type='1')
    if not answer:
        answer2 = Answer.objects.filter(user=request.user,is_answered=False,question__question_type='2')
        answer = answer2
        if not answer2:
            answer3 = Answer.objects.filter(user=request.user,is_answered=False,question__question_type='3')
            answer = answer3
    if answer:
        answer = answer[0]
    else:
        answer = None
    return render(request,'index.html',{'answer':answer})


def update_answer(request):
    aid = request.POST['aid']
    answer = Answer.objects.get(id=aid)
    answer.is_answered = True
    answer.answer = request.POST['response']
    answer.save()
    return HttpResponse(json.dumps({
                        'type': 'success',
                        'message': 'Answer saved successfully'
                    }))

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        age = request.POST['age']
        gender = request.POST['gender']
        ethnicity = request.POST['ethnicity']
        text = request.POST['text']
        is_tai_chyi = request.POST['fooby[2][]']
        try:
            user = User.objects.get(username=username)
            return render(request,'register.html',{'user':True})
        except:
            user = User()
            user.username = username
            user.first_name = first_name
            user.last_name = last_name
            user.email = email
            user.password = make_password(password)
            user.is_active = True
            user.save()
            profile = UserProfileInfo()
            profile.age = age
            profile.gender = gender
            profile.ethnicity = ethnicity
            profile.user = user
            profile.text = text
            profile.is_tai_chyi = is_tai_chyi
            profile.save()
            msg = {}
            context = {'user': user}
            msg['email_list'] = [user.email]
            msg['user_id'] = user.username
            msg['subject'] = "Thankyou for connecting with us"
            msg['body'] = get_template('welcome_mail_template.html').render(context)
            send_email(**msg)
            return render(request,'register.html',{'success':True})

    return render(request,'register.html',{'success':False,'user':False})    


def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/')
            else:
                return HttpResponse("Your account was inactive.")
        else:
            print("Someone tried to login and failed.")
            print("They used username: {} and password: {}".format(username, password))
            return HttpResponse("Invalid login details given")
    else:
        return render(request, 'login.html', {})


def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/login/')

def videos(request):
    return render(request, 'videos.html', {})

def view_userdetails(request, user_id):
    # attempt to get the user object based on id number
    try:
        user = UserProfileInfo.objects.get(user__id=user_id)
    except:
        user = None
    # if request.method == 'POST':
    #     username = request.POST['username']
    #     first_name = request.POST['first_name']
    #     last_name = request.POST['last_name']
    #     email = request.POST['email']
    #     age = request.POST['age']
    #     gender = request.POST['gender']
    #     ethnicity = request.POST['ethnicity']
        
    #     user.username = username
    #     user.first_name = first_name
    #     user.last_name = last_name
    #     user.email = email
    #     user.contact = contact
    #     user.manager_email = manager_email
    #     user.slack_id = slack_id
    #     if role != '':
    #         user.role = role
    #     user.save()
    #     msg = 'A User Profile has been updated on username '+user.username 
    #     activity = 'User Profile Updation'
    #     page='User Account Page'
    #     create_activity_log(request,activity,msg,page)
    #     # send_to_slack(msg)
    #     return HttpResponse(json.dumps({
    #                     'type': 'success',
    #                     'message': 'User saved successfully'
    #                 }))        
    return render(request,'myaccount.html',{'iuser':user})        

def welcome(request):
    return render(request, 'welcome.html', {})