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

    def create(self, request): # Here is the new update comes <<<<
        post_data = request.data
        print("POSTED DATA ", post_data)


        #img_name = request.data['image']
        image = request.data['image']
        new_image = Image.objects.create(image=image, detected_objects=["lala"])
        new_image.save()
        return HttpResponse(status=200)  


    """
    def post_image(self, request, *args, **kwargs):
        print("heeeeeeeere")
        img_id = request.data['id']
        #img_name = request.data['image']
        image = request.data['image']
        new_image = Image.objects.create(id=img_id, image=image, detected_objects=["lala"])
        new_image.save()
        return HTTPResponse({'message': 'Image created'}, status=200)  
    """ 

