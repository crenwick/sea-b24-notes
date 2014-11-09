Notes App
==============================
[![Build Status](https://travis-ci.org/crenwick/sea-b24-notes.svg?branch=master)](https://travis-ci.org/crenwick/sea-b24-notes)

The notes demo app.

GET /api/notes - retreives all the notes in the DB

POST /api/notes - posts a JSON note the the database. Requires a noteTitle (note titles can only be one word).

GET /api/notes/:id - retreives the note with that ID
