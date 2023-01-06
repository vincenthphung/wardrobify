import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from hats_rest, here.
# from shoes_rest.models import Something
from shoes_rest.models import Shoes, wardrobe_binVO

def get_bin():
    response = requests.get("http://wardrobe-api:8000/api/bin/")
    content = json.loads(response.content)
    for bin in content["bins"]:
        wardrobe_binVO.objects.update_or_create(
            import_href=bin["href"],
            defaults={"bin_number": bin["bin_number"]},
        )


def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            # Write your polling logic, here
            get_bin()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
