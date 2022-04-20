# airq - assignment
just an assignment
To run it/ test it in your local system go to this pull this Docker image ' <b>vivobookdocker/airq</b> '

command to pull the image : docker pull vivobookdocker/airq:latest

Endpoints to test it in postman.
>GET: /getairq 
 - should pass the key you get as x-api-key header
 - you will recieve a success status if key is valid.
>GET : /
 - home route. Welcome page.
>Other routes can be handled from UI.

Example:
If you run it via docker
 - Homepage will be <b>http://localhost:8000/</b>
 - Endpoint to test via postman will be <b>http://localhost:8000/getairq</b>
