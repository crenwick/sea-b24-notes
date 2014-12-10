Notes App
==============================
[![Build Status](https://travis-ci.org/crenwick/sea-b24-notes.svg?branch=master)](https://travis-ci.org/crenwick/sea-b24-notes)

Front end built with React.

Backend built with Node, Express, and other libraries. User endpoints require JWT tokens to be sent as headers.

POST /api/users with {email: email@example.com, password: pass123} to create an account

GET /api/users with email@example.com:pass123 to retrieve a JWT token

With the JWT token set as a header:

GET /v1/api/notes - retreives all the notes in the DB

POST /v1/api/notes - posts a JSON note the the database. Requires a noteTitle (note titles can only be one word).

GET /v1/api/notes/:id - retreives the note with that ID

{"email": "email@example.com", "password": "pass123456"}
{
    "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDdjYTY1ZGZiNjFlYTk0MWEzZTUzMGEiLCJleHAiOjE0MTc0NTUxOTc2NDd9.HGzqRk_h0QRWVd0mlmsCZbG-eBaX1i-w5sqtTVq68lU"
}
