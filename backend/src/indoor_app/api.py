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

    def create(self, request): # Here is the new update comes <<<<
        post_data = request.data
        print("POSTED DATA ", post_data)



        
        #img_name = request.data['image']
        image = request.data['image']

        model = load_model()
        detections = predict2(model, image)

        print("DETECTIONS ")
        print(detections)

        new_image = Image.objects.create(image=image, detected_objects=detections)
        new_image.save()

        response = HttpResponse(status=200)
        response["image"] = image
        response["detected_objects"] = detections
        print("RESPONSE IS ", response["image"])
        return response


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

