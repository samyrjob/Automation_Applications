# test_sample.py
import pytest
from conftest import mock_object



def test_mocked_object(mock_object):
    mock_object.object_id = "new_id"

    assert mock_object.to_json()["objectId"] == "new_id"


