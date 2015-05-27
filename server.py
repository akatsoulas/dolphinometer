import json
from bottle import jinja2_view, route, run, static_file, request

import models


@route('/')
@jinja2_view('home.html', template_lookup=['templates'])
def home():
    return {
        'entries': models.db.query(models.LogEntry).order_by('-id').limit(100),
    }


@route('/control')
@jinja2_view('control.html', template_lookup=['templates'])
def control():
    return {
        'interval': os.environ.get('INTERVAL', 5000),
    }


@route('/static/<path:path>')
def static(path):
    return static_file(path, root='static')


@route('/update', ['GET', 'POST'])
def update():
    if request.method == 'POST':
        try:
            counter = int(request.forms.get('counter'))
        except ValueError:
            counter = 0
        else:
            logentry = models.LogEntry(counter=counter)
            logentry.save()
    else:
        query = models.db.query(models.LogEntry).order_by('-id').limit(1)
        try:
            counter = query[0].counter
        except IndexError:
            counter = 0
    return json.dumps({'counter': counter})


if __name__ == '__main__':
    import os
    PORT = os.environ.get('PORT', 8000)
    run(host='0.0.0.0', port=PORT, reloader=True)
