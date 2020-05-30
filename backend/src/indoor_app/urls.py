from rest_framework import routers
from .api import ArticleViewSet, ImageViewSet
from . import views
from django.urls import include, path
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register('api/indoor_app', ArticleViewSet, 'indoor_app')
router.register('api/indoor_app/lala', ImageViewSet, 'indoor_app')

#urlpatterns = router.urls
# pod gornava linija se bese iskomentirano prethodno

urlpatterns = [
    path('', include(router.urls))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
