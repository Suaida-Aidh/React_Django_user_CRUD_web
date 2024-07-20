from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, ClassUserList
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [

    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   
    path('users/',RegisterView.as_view(), name='user-list'), #for getting all users
    path('users/<int:pk>/',RegisterView.as_view(), name='user-detail'),  # for getting a single user by pk
    path('class-userlist/',ClassUserList.as_view(),name='class-user-list'),  # for getting a single user by pk

    


]
