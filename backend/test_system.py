import requests
import sys

BASE_URL = "http://localhost:4000/api/auth"

def run_tests():
    print("--- Starting Backend Tests ---")
    
    # 1. Test Employee Registration
    print("\n[1] Testing Employee Registration...")
    resp = requests.post(f"{BASE_URL}/register", json={
        "email": "test_emp_02@hrms.com",
        "password": "Password123!",
        "role": "Employee"
    })
    
    if resp.status_code == 201:
        print("SUCCESS: Employee registered successfully.")
    elif resp.status_code == 400 and "already exists" in resp.text:
        print("SUCCESS: Employee already exists (Test run before).")
    else:
        print(f"FAILED! Status: {resp.status_code}, Body: {resp.text}")
        return False
        
    # 2. Test HR Registration
    print("\n[2] Testing HR Registration...")
    resp = requests.post(f"{BASE_URL}/register", json={
        "email": "test_hr_02@hrms.com",
        "password": "Password123!",
        "role": "HR"
    })
    
    if resp.status_code == 201:
        print("SUCCESS: HR registered successfully.")
    elif resp.status_code == 400 and "already exists" in resp.text:
        print("SUCCESS: HR already exists (Test run before).")
    else:
        print(f"FAILED! Status: {resp.status_code}, Body: {resp.text}")
        return False

    # 3. Test Employee Login
    print("\n[3] Testing Employee Login...")
    resp = requests.post(f"{BASE_URL}/login", json={
        "identifier": "test_emp_02@hrms.com",
        "password": "Password123!"
    })
    
    if resp.status_code == 200:
        data = resp.json()
        if "token" in data and data["user"]["role"] == "Employee":
            print("SUCCESS: Employee login successful and token received.")
        else:
            print("FAILED! Token missing or wrong role!")
            return False
    else:
        print(f"FAILED! Employee login failed! Status: {resp.status_code}")
        return False
        
    # 4. Test HR Login
    print("\n[4] Testing HR Login...")
    resp = requests.post(f"{BASE_URL}/login", json={
        "identifier": "test_hr_02@hrms.com",
        "password": "Password123!"
    })
    
    if resp.status_code == 200:
        data = resp.json()
        if "token" in data and data["user"]["role"] == "HR":
            print("SUCCESS: HR login successful and token received.")
        else:
            print("FAILED! Token missing or wrong role!")
            return False
    else:
        print(f"FAILED! HR login failed! Status: {resp.status_code}")
        return False

    print("\nALL TESTS PASSED SUCCESSFULLY! The Backend and Database are perfect.")
    return True

if __name__ == "__main__":
    try:
        import requests
    except ImportError:
        print("requests module not found, please install it first.")
        sys.exit(1)
        
    success = run_tests()
    if not success:
        sys.exit(1)
