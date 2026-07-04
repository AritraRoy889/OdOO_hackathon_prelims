import urllib.request
import json

req = urllib.request.Request(
    'http://localhost:4000/api/leave/apply',
    data=json.dumps({
        "leave_type": "Sick Leave",
        "from_date": "2026-07-01",
        "to_date": "2026-07-27",
        "days": 26,
        "reason": "Test"
    }).encode('utf-8'),
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test'
    },
    method='POST'
)

try:
    with urllib.request.urlopen(req, timeout=5) as response:
        print("Status:", response.status)
        print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", str(e))
    if hasattr(e, 'read'):
        print(e.read().decode('utf-8'))
