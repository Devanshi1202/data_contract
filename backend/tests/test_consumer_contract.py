import pytest
import requests
from pact import Consumer, Provider

PACT_DIR = './contracts/pact/consumer'

pact = Consumer('consumer-service').has_pact_with(
    Provider('producer-service'),
    pact_dir=PACT_DIR,
    version='1.0.0',
    host_name='localhost',
    port=1234
)

@pytest.fixture(scope='module')
def pact_setup():
    pact.start_service()
    yield pact
    pact.stop_service()

def test_user_contract(pact_setup):
    expected_body = {
        "id": 1,
        "email": "user@example.com",
        "created_at": "2024-01-01T00:00:00Z"
    }

    pact_setup \
        .given("User with ID 1 exists") \
        .upon_receiving("A request to get user info") \
        .with_request(method="GET", path="/users/1") \
        .will_respond_with(200, body=expected_body)

    with pact_setup:
        result = requests.get("http://localhost:1234/users/1")
        assert result.status_code == 200
        assert result.json() == expected_body
