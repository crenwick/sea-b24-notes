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
    <div data-ng-controller="notesCtrl">
      <label>New Note:</label><br>
      <input type="text" data-ng-model="newNotes.noteBody"/> <!-- each directive should have at least one '.' in the name -->
      <button data-ng-click="saveNewNote()">Save Note</button>
      <h2>{{greeting}}</h2>
        <input type="text" data-ng-model="greeting"/>
        <div data-ng-repeat="note in notes">
          <div data-ng-hide="note.editing">
          <p>{{note.noteBody}}</p>
          <button data-ng-click="editNote = true)">Edit</button>
          <button data-ng-click="deleteNote(note)">Delete</button>
          </div>
          <div data-ng-show="note.editing">
            <input type="text" data-ng-model="note.noteBody">
            <button data-ng-click="saveNote(note)">Save</button>
            <button data-ng-click="note.editing = false">Cancel</button>
          </div>
        </div>
    </div>
</div>
<script src="client_bundle.js"></script>
```

app/js/client.js:
```
require('angular/angular'); // do no give this a variable
var notesApp = angular.module('notesApp', []); // creates a module with an array of dependencies
require('./notes/controllers/notes_controller')(notesApp);
```

app/js/notes/controllers/notes_controller.js:
```
module.exports = function(app) {
  // dont build anything inside anuglar with '$'
  app.controller('notesCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.index = function() {
        $http({
            method: 'GET',
            url: '/api/notes',
        })
        .success(function(data) { //status can be a second parameter
            $scope.notes = data;
        })
        .error(function(data, status){
            console.log(data);
        });
    };
    $scope.index(); // this will be called differently later
    
    $scope.saveNewNote = function() {
      $http({
        method: 'POST',
        url: '/api/notes',
        data: $scope.newNote
      })
      .success(function(data) {
        $scope.notes.push(data);
        $scope.newNote = null;
      })
      .error(fucntion(data) {
        $console.log(data);
      });
    };
    
    $scope.saveNote = function(note) {
      $http({
        method: 'PUT',
        url: '/api/notes' + note._id,
        data: note
      })
      .success(function() {
        note.editing = false;
      })
      .error(function(data) {
        console.log(data);
      });
    };
    
    $scope.deleteNote = function(note) {
      $http({
        method: 'DELETE',
        url: '/api/notes/' + note._id
      })
      .success(function() {
        $scope.notes.splice($scope.notes.indoesOf(note), 1);
      })
      .error(function() {
        console.log(data);
      }
    };
  }]);
};
```
