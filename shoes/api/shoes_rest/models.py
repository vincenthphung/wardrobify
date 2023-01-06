from django.db import models
from django.urls import reverse


class wardrobe_binVO(models.Model):
    bin_number = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200, unique=True, null=True)


class Shoe(models.Model):
    manufacturer_name = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    shoe_color = models.CharField(max_length=100)
    picture_url = models.URLField()
    wardrobe_bin = models.ForeignKey(
        wardrobe_binVO, related_name="wardrobe_bin", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.model_name

    def get_api_url(self):
        return reverse("api_show_shoe", kwargs={"pk": self.pk})
