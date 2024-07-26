1. Create API:
- Server running API: localhost:5000/cortana (the domain | server URL)
- Endpoint: cortana <- code written in Python
- Request:
    Def: Is what we send to the Server (in this case is the API)
    Type: 
        + GET: access some type of resource, we are trying to get | retrieve something
        + POST: we are trying to create something new
        + PUT: We use PUT to modify a resource. PUT updates the entire resource with data that is passed in the body payload. If there is no resource that matches the request, it will create a new resource.
        + PATCH: making partial changes to an existing resource.
        + DELETE
    JSON: {data} 
- Response:
    Def: 
    Status: 
        200: success
        400: bad request
        403: forbidden
        404: not found
    JSON: {data}

Chatbot Project: We will send a GET request (get the JSON data from user input) to the frontend, then our API will return a Response containing how this Request is handled by the status

LETS BUILD THE API
