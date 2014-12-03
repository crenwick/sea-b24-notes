/** @jsx React.DOM */
/* global React*/

React = require('react');
var getNotes = require('../getNotes');

var TodoList = React.createClass({displayName: 'TodoList',
  render: function() {
    var createItem = function(itemText) {
      return React.createElement("li", null, itemText);
    };
    return React.createElement("ol", null, this.props.items.map(createItem));
  }
});

var TodoApp = React.createClass({displayName: 'TodoApp',
  getInitialState: function() {
    obj = {items: [], text: ''};
    this.getAllNotes();
    return obj;
  },
  getAllNotes: function() {
    getNotes(function(data){
      data.forEach(function(element, index){
        console.log(index);
        //console.log('inside:', this.items);
        console.log(data[index].noteTitle);
      });
    });
    console.log('outside:', this.items);
    console.log('outside this.obj:', this.obj);
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleClick: function(){
    console.log('CLICKS');
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
    console.log(this.state.items);
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h3", {onClick: this.handleClick}, "Notes App"), 
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

React.render(React.createElement(TodoApp, null), document.getElementById('todo'));