from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import wardrobe_binVO, Shoe

class wardrobe_binVOEncoder(ModelEncoder):
    model = wardrobe_binVO
    properties = ["bin_number", "import_href", "id"]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
        "manufacturer_name",
        "shoe_color",
        "picture_url",
        "wardrobe_bin",
        "id",
    ]

    encoders = {
        "wardrobe_bin": wardrobe_binVOEncoder(),
    }

    def get_extra_data(self, o):
        return {"bin": o.wardrobe_bin.bin_number}

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer_name",
        "model_name",
        "shoe_color",
        "picture_url",
        "wardrobe_bin",
        # "id",
    ]
    encoders = {
        "wardrobe_bin": wardrobe_binVOEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoe_list = Shoe.objects.filter(bin=bin_vo_id)
        else:
            shoe_list = Shoe.objects.all()

        return JsonResponse(
            {"shoes": shoe_list},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)
        # try:
        #     bin_href = content["wardrobe_bin"]
        #     bin = wardrobe_binVO.objects.get(import_href=bin_href)
        #     content["wardrobe_bin"] = bin
        try:
            bin = wardrobe_binVO.objects.get(id=content["wardrobe_bin"])
            content["wardrobe_bin"] = bin
        except wardrobe_binVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id in list shoes"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeListEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

    elif request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        try:
            if "wardrobe_bin" in content:
                # bin_href = content["wardrobe_bin"]
                bin = wardrobe_binVO.objects.get(id=content["wardrobe_bin"])
                content["wardrobe_bin"] = bin

        except wardrobe_binVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id in show shoe detail"}
            )

        Shoe.objects.filter(id=pk).update(**content)
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
