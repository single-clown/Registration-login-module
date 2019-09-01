from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.http import JsonResponse
import time,random
from django.contrib.auth import logout
from .models import User

# Create your views here.

def index(request):
    username = request.session.get("username","游客")
    return render(request,'myApp/main.html',{"username":username})

def login(request):
    if request.method == 'POST':
        username = request.POST.get("username")
        password = request.POST.get("password")
        try:
            user = User.objects.get(userAccount=username)
            if user.userPassword != password:
                return redirect('/login/')
        except User.DoesNotExist as e:
            return redirect('/login/')
        token = str(time.time() + random.randrange(1, 1000000))
        user.userToken = token  # 改变用户的token值
        user.save()
        # 保存其session和token以便其以后登录时使用
        request.session["username"] = username
        request.session["token"] = password
        # 返回主页面
        return redirect('/')

    else:
        return render(request, 'myApp/login.html')

def regist(request):
    userAccount = request.POST.get("usernamesignup")
    userPasswd = request.POST.get("passwordsignup")
    userToken = str(time.time() + random.randrange(1, 1000000))  # 时间戳+随机数
    user = User.createuser(userAccount, userPasswd, userToken) # 调用方法，创建用户
    user.save()
    # 保存其session和token以便其以后登录时使用
    request.session["username"] = userAccount
    request.session["token"] = userToken
    # 返回主页面
    return redirect('/')


def checkuserid(request):
    userid = request.POST.get("userid")
    # 让传过来的用户名去取数据，可以取出来，则说明已经被注册过，反之亦然
    try:
        user = User.objects.get(userAccount=userid)
        return JsonResponse({"data": "该用户已经被注册", "status": "error"})
    except User.DoesNotExist as e:
        return JsonResponse({"data": "ok", "status": "success"})

def quit(request):
    logout(request)
    return redirect('/')

def check_username(request):
    username = request.POST.get("username")
    try:
        user = User.objects.get(userAccount=username)
        passwd = user.userPassword
        return JsonResponse({"status":"success","passwd":passwd})
    except Exception as e:
        return JsonResponse({"status":"error"})

