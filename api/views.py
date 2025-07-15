from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from .models import Note
# Create your views here.
from rest_framework.decorators import api_view
from .serializer import NoteSerializer
@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/notes/',
            'methods': 'GET',
            'body': None,
            'description': 'Get all notes',
        },
        {
            'Endpoint': '/notes/id',
            'methods': 'GET',
            'body': None,
            'description': 'Get note by id',
        },
        {
            'Endpoint': '/notes/create',
            'methods': 'POST',
            'body': {'body': ""},
            'description': 'Create a new note',
        },
        {
            'Endpoint': '/notes/id/update',
            'methods': 'PUT',
            'body': {'body': ""},
            'description': 'Update an existing note',
        },
        {
            'Endpoint': '/notes/id/delete',
            'methods': 'DELETE',
            'body': None,
            'description': 'Delete an existing note',
        }
    ]


    return Response(routes)

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getNote(request, key):
    notes = Note.objects.get(id=key)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateNote(request, key):
    data = request.data
    note = Note.objects.get(id=key)
    serializer = NoteSerializer(instance=note, data=data, many=False)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data.get('body'),
    )
    serializer = NoteSerializer(instance=note, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
def deleteNote(request, key):
    note = Note.objects.get(id=key)
    note.delete()

    return Response('Note has been deleted.')