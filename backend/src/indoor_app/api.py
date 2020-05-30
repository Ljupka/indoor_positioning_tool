from indoor_app.models import Article, Image
from rest_framework import viewsets, permissions
from django.http import HttpResponse
from .serializers import ArticleSerializer, ImageSerializer

# Article Viewset


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ArticleSerializer

    # overwrite built-in post method
    """
    def post(self, request, *args, **kwargs):
        print("heeeeeeeere")
        title = request.data['cover']
        content = request.data['content']
        image = request.data['image']
        Article.objects.create(title=title, content=content, image=image)
        return HTTPResponse({'message': 'Article created'}, status=200)
    """


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ImageSerializer
