from rest_framework import routers
from .api import ImageViewSet
from . import views
from django.urls import include, path
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register('indoor_app', ImageViewSet, 'indoor_app')



#path('indoor_app/post_image/', views.post_image)
urlpatterns = [
    path('', include(router.urls))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
