from django.db import models

# Create your models here.
class User(models.Model):
    #用户账户，要唯一
    userAccount = models.CharField(max_length=20,unique=True)
    #密码：
    userPassword = models.CharField(max_length=20)
    #token验证值，每次登录之后都会更新
    userToken = models.CharField(max_length=50)
    @classmethod  #这是该类的一个方法，可以在别的地方去调用
    def createuser(cls,account,password,token):
        u = cls(userAccount = account,userPassword = password,userToken = token)
        return u

