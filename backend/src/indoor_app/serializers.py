from rest_framework import serializers
from indoor_app.models import Image

# Article Serializer


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'
