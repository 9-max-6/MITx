from rest_framework import serializers
from .models import User, Opportunity

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance

class OpportunitySerializer(serializers.ModelSerializer):
    """Serializers for the opportunity class"""
    class Meta:
        model = Opportunity
        fields = '__all__'