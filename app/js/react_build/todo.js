/** @jsx React.DOM */
React = require('react');
var getNotes = require('../getNotes');
var notes = [];

var TodoList = React.createClass({displayName: 'TodoList',
  render: function() {
    var createItem = function(itemText) {
      return React.createElement("li", null, itemText);
    };
    return React.createElement("ul", null, this.props.items.map(createItem));
  }
});

var TodoApp = React.createClass({displayName: 'TodoApp',
  getInitialState: function() {
    getNotes()
    return {items: notes, text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  listUpdate: function() {
    this.forceUpdate;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      React.createElement("div", null, 
          React.createElement("h3", null, "Notes App"), 
          React.createElement(TodoList, {items: this.state.items}), 
          React.createElement("form", {onSubmit: this.handleSubmit}, 
          React.createElement("input", {onChange: this.onChange, value: this.state.text}), 
          React.createElement("button", null, 'Add #' + (this.state.items.length + 1)
      )
      )
      )
    );
  }
});

getNotes(function(x) {
  var l = x.length;
  for (var i = 0; i < l; i++) {
    notes.push(x[i].noteTitle);
  }
  React.render(React.createElement(TodoApp, null),
               document.getElementById('todo')); 
});
