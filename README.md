# airq - assignment
An assignment

You can visit this link https://shielded-garden-75372.herokuapp.com/  to test this application

Note: copy the api key generated from the browser and send it as x-api-key header along with https://shielded-garden-75372.herokuapp.com/getairq in postman ( GET mode ).

To see all the keys and usages and limits go to https://shielded-garden-75372.herokuapp.com/viewall from the broswer.

Endpoints to test it in postman.
>GET: /getairq 
 - should pass the key you get as x-api-key header
 - you will recieve a success status if key is valid.
>GET : /
 - home route. Welcome page.
>Other routes can be handled from UI.

Example:
 - Homepage will be <b>https://shielded-garden-75372.herokuapp.com/</b> ( in browser )
 - Endpoint to test via postman will be <b>https://shielded-garden-75372.herokuapp.com/getairq</b>


To run it/ test it in your local system you need docker.

in command prompt do : <b>docker-compose up --build</b>

Example:
If you run it via docker
 - Homepage will be <b>http://localhost:8000/</b> ( in browser )
 - Endpoint to test via postman will be <b>http://localhost:8000/getairq</b>
