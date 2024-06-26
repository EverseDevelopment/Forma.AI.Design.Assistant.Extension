import json

def is_working(event, context):
    if event:
        return 'data recieved', event

    else:
        return 'no data recieved'