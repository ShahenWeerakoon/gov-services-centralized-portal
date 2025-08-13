from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@permission_classes([AllowAny])
def about(request):
    data = {
        'title': 'About Us',
        'content': 'Welcome to our full-stack application built with React, Django, and PostgreSQL.',
        'mission': 'We aim to provide excellent web solutions.',
        'team': ['John Doe - Developer', 'Jane Smith - Designer']
    }
    return Response(data)

@api_view(['POST'])
@permission_classes([AllowAny])
def contact(request):
    # Handle contact form submission
    name = request.data.get('name', '')
    email = request.data.get('email', '')
    message = request.data.get('message', '')
    
    if not all([name, email, message]):
        return Response(
            {'error': 'All fields are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Here you would typically save to database or send email
    # For now, we'll just return a success message
    
    return Response({
        'message': 'Thank you for your message. We will get back to you soon!',
        'data': {
            'name': name,
            'email': email,
            'message': message
        }
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def contact_info(request):
    data = {
        'title': 'Contact Us',
        'email': 'contact@example.com',
        'phone': '+1 (555) 123-4567',
        'address': '123 Main St, City, State 12345'
    }
    return Response(data)