/** @jsx React.DOM */
/* global React*/

React = require('react');
var getNotes = require('../getNotes');
var c = 0;

var TodoList = React.createClass({displayName: 'TodoList',
  render: function() {
    var keyId = this.props.items.length;
    console.log('length num', this.props);
    var createItem = function(itemText) {
      c++;
      console.log('keyId:', keyId);
      console.log('c:', c);
      return React.createElement("li", null, itemText);
    };
    return React.createElement("ol", null, this.props.items.map(createItem));
  }
});

var TodoApp = React.createClass({displayName: 'TodoApp',
  getInitialState: function() {
    return {items: [], text: ''};
  },
  componentDidMount: function() {
    getNotes(function(data){
      data.forEach(function(element, index){
        var nextItems = this.state.items.concat([data[index].noteTitle]);
        this.setState({items: nextItems, text:''});
      }.bind(this));
    }.bind(this));
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
    console.log(this.state);
    console.log('e:', e);
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