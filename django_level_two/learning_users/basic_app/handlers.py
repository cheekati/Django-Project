import os
import pytz
import re
from datetime import date,datetime

from django.conf import settings
from django.core.mail import EmailMessage
from django.http import HttpResponse
from django.conf import settings
from django.utils.crypto import constant_time_compare, salted_hmac
from django.utils.http import base36_to_int, int_to_base36
from django.core.mail import send_mail


def send_email(**kwargs):
    if 'attachment' in kwargs:
        file_name=kwargs['attachment']
    else:
        file_name=False
    from_email = settings.EMAIL_HOST_USER
    email_list = kwargs['email_list']
    subject = kwargs['subject']
    message = kwargs['body']
    send_mail(subject, message, from_email, email_list, fail_silently = False)
    # msg = EmailMessage(subject=subject,message=message,to=email_list)
    # # msg.message= message
    # # msg.content_subtype = "html"
    # msg.use_template_subject = False
    # msg.use_template_from = True
    # if file_name:
    #     msg.attach_file(file_name)
    # msg.send()        
    # if file_name and os.path.isfile(file_name):
    #     os.system("rm "+file_name)
