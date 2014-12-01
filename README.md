Notes App
==============================
[![Build Status](https://travis-ci.org/crenwick/sea-b24-notes.svg?branch=master)](https://travis-ci.org/crenwick/sea-b24-notes)

The notes demo app. Requires a login and jwt-token exchange to create, lookup, and delete notes.

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

Angular Notes
==============

`$ bower install --save angular`
`$ mkdir app/js/notes`
app/index.html:
```
<div data-ng-app="notesApp">
  <h2>{{greeting}}</h2>
  <input type="text" data-ng-model="greeting"/>
</div>
<script src="client_bundle.js"></script>
```

app/js/client.js:
```
require('angular/angular'); // do no give this a variable
var notesApp = angular.module('notesApp', []); // creates a module with an array of dependencies
```