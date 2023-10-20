import os

import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

TARGET_HOST = f'http://{os.environ.get("TARGET_HOST")}:{os.environ.get("TARGET_PORT")}'


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def userRequest(request):
    if request.method == "POST":
        return _create_user(request)
    elif request.method == "GET":
        return _get_user(request)
    elif request.method == "DELETE":
        return _delete_user(request)
    elif request.method == "PUT":
        return _edit_user(request)


def _create_user(request):
    return _handleResponse(requests.post(_getPath(request), json=request.data))


def _get_user(request):
    response = requests.get(_getPath(request))
    return Response(response.json(), status=response.status_code)


def _edit_user(request):
    return _handleResponse(requests.put(_getPath(request), json=request.data))


def _delete_user(request):
    return _handleResponse(requests.delete(_getPath(request)))


def _handleResponse(response):
    if response.status_code == 201 or response.status_code == 200:
        return Response(status=response.status_code)
    else:
        return Response(response.json(), status=response.status_code)


def _getPath(request):
    return f"{TARGET_HOST}{request.get_full_path()}"
