from django.contrib import admin
from .models import Shoe, wardrobe_binVO


class ShoeAdmin(admin.ModelAdmin):
  pass

admin.site.register(Shoe)
