/** @jsx React.DOM */
/* global React*/

React = require('react');
var getNotes = require('../getNotes');
var c = 0;

var CreateItem = React.createClass({displayName: 'CreateItem',
  render: function() {
    return React.createElement("li", null, this.props.data);
  }
});

var TodoList = React.createClass({displayName: 'TodoList',
  render: function() {
    return (
      React.createElement("ol", null, 
        this.props.items.map(function(item){
          return React.createElement(CreateItem, {key: this.props.items[this.props.items.indexOf(item)]._id, data: item.noteTitle});
        }.bind(this))
      )
    );
  }
});

var TodoApp = React.createClass({displayName: 'TodoApp',
  getInitialState: function() {
    return {items: [], text: ''};
  },
  componentDidMount: function() {
    getNotes(function(data){
      data.forEach(function(element, index){
        var nextItems = this.state.items.concat([data[index]]);
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
    // This needs to send a POST and recieve a proper _id !
    e.preventDefault();
    var obj = {noteTitle: '', _id: ''};
    var nextItems = this.state.items.concat([{noteTitle: this.state.text, _id: c}]);
    c++;
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
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