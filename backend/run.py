from app import create_app
from waitress import serve
import sys

app = create_app()

if __name__ == '__main__':
    if app.config['DEBUG']:
        app.run(host='0.0.0.0', port=app.config['PORT'], debug=True)
    else:
        print(f"[HRMS] Starting Waitress production server on port {app.config['PORT']}...", file=sys.stderr)
        serve(app, host='0.0.0.0', port=app.config['PORT'], threads=6)
