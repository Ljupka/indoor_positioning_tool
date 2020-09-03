from indoor_app.models import Image
from rest_framework import viewsets, permissions
from django.http import HttpResponse
from .serializers import ImageSerializer

# Article Viewset


"""
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ArticleSerializer


"""


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ImageSerializer
