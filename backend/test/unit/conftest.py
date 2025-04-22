import pytest


@pytest.fixture
def mock_object():
   class MockObject(object):
      object_id = "id"
      some_property = "some_property_value"

      def to_json(self):
         return {
            "objectId": self.object_id,
            "someProperty": self.some_property,
            
         }
   return MockObject()




