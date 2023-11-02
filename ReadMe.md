# Enigma :
Simulation of the enigma machine.
# Installation :
    npm install
    npm start
# Endpoints :
POST /securitySchemes/add

    Description: Add a new security scheme.
    Request Payload: Expects a JSON object with the following properties:
        name (string): The name of the security scheme.
        cesar (object):
            increment (number): The increment for the Caesar cipher.
            shift (number): The shift value for the Caesar cipher.
        rotor (string): The rotor for the security scheme.
    Response: Returns the created security scheme with a status code of 201 if successful. If there is an error, it returns a 400 status code with an error message.

POST /securitySchemes/encrypt

    Description: Encrypt a message using a specific security model.
    Request Payload: Expects a JSON object with the following properties:
        input (string): The message to encrypt.
        securityModelName (string): The name of the security model to use for encryption.
    Response: Returns the encrypted message with a status code of 200 if successful. If there is an error, it returns a 400 status code with an error message.

POST /securitySchemes/decrypt

    Description: Decrypt a message using a specific security model.
    Request Payload: Expects a JSON object with the following properties:
        input (string): The message to decrypt.
        securityModelName (string): The name of the security model to use for decryption.
    Response: Returns the decrypted message with a status code of 200 if successful. If there is an error, it returns a 400 status code with an error message.
