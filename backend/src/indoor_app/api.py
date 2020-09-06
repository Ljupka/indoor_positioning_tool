from indoor_app.models import Image
from rest_framework import viewsets, permissions
from django.http import HttpResponse
from .serializers import ImageSerializer
#from .nn import predictor
#from .nn import model_loader
import sys 

sys.path.append('C:/Users/Ljupka/Desktop/App/indoor_simulation/backend/nn')
from predictor import predict2
from model_loader import load_model




# Article Viewset


"""
class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    permission_classes = [
        permissions.AllowA.
    ]
    serializer_class = ArticleSerializer


"""


class ImageViewSet(viewsets.ModelViewSet):
    
    queryset = Image.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ImageSerializer


    def create(self, request): 
        post_data = request.data
        print("POSTED DATA ", post_data)



        image = request.data['image']

        model = load_model()
        detections = predict2(model, image)

        

        new_image = Image.objects.create(image=image, detected_objects=detections)
        new_image.save()

        response = HttpResponse(status=200)
        response["image"] = image
        response["detected_objects"] = detections
       
        return response



