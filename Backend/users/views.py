from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import CurrentUserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view
from django.http.response import Http404
from rest_framework.exceptions import NotFound
from rest_framework.generics import ListCreateAPIView
from rest_framework.filters import SearchFilter,OrderingFilter
from rest_framework import status




# Create your views here.


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        print(token)
        # Add custom claims
        token['username'] = user.username
        token['is_admin'] = user.is_superuser
        print(token)

        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):

    routes=[
        'api/token',
        'api/token/refresh'
    ]

    return Response(routes)


class RegisterView(APIView):
    def post(self, request):
        data = request.data
        serializer = CurrentUserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Response("User not found!", status=status.HTTP_404_NOT_FOUND)
        
    def get(self, request, pk=None):
        if pk:
            user = self.get_user(pk)
            serializer = CurrentUserSerializer(user)
        else:
            users = User.objects.all()
            serializer = CurrentUserSerializer(users, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk=None):
        user_to_update = User.objects.get(pk=pk)
        serializer = CurrentUserSerializer(instance=user_to_update, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response('User Updated Successfully', status=status.HTTP_200_OK)
        return Response('Failed To Update User', status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        user_to_delete = User.objects.get(pk=pk)
        user_to_delete.delete()
        return Response('User Deleted Successfully', status=status.HTTP_204_NO_CONTENT)

class ClassUserList(ListCreateAPIView):
    queryset = User.objects.filter(is_superuser=False)
    serializer_class = CurrentUserSerializer
    filter_backends = [SearchFilter]
    search_fields = ['username', 'email']

        
    
