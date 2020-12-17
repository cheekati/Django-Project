# Author: Integra
# Dev: Partha(Ref)

import hashlib, re, sys, inspect
from datetime import datetime 

from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import logout
from django.utils.translation import activate
from django.utils.deprecation import MiddlewareMixin
from django.http import Http404

class LoginRequired(MiddlewareMixin):

    def process_request(self, request):
    	# import pdb;pdb.set_trace()
        if request.user.is_authenticated:
        	return
        else:
        	if request.path == "/login/" or request.path == '/register/' or request.path == '/admin/' or request.path == '/admin' or request.path == '/admin/login/':
        		return
        	return HttpResponseRedirect('/login/')