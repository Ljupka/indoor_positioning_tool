from django.db import models


def upload_path(instance, filename):
    upload_path = '/'.join(['images', filename])
    print("upload path is ", upload_path)
    return upload_path


class Article (models.Model):
    image = models.ImageField(blank=True, null=True, upload_to=upload_path)

    def __str__(self):
        return self.title


""" image = models.ImageField(upload_to='post_images') """


class Image (models.Model):
    title = models.CharField(max_length=120)
    image = models.CharField(max_length=120)

    def __str__(self):
        return self.title
