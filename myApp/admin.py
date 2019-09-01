from django.contrib import admin
from .models import User

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['userAccount','userPassword']
    list_filter = ['userAccount']
    search_fields = ['userAccount']
    list_per_page = 10




