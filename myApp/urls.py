from django.conf.urls import url
from django.urls import path,include
from . import views


urlpatterns = [
    url(r'^$',views.index),
    url(r'^login/$',views.login),
    url(r'^regist/$',views.regist),
    url(r'^checkuserid/$',views.checkuserid),
    url(r'^quit/$',views.quit),
    url(r'^check_username/$',views.check_username),
]








