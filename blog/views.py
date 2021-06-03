from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializer import ArticleSerializer
from .models import Article


class ArticleView(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
