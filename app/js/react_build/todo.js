/** @jsx React.DOM */
/* global React*/

React = require('react');
var getNotes = require('../getNotes');
var postNotes = require('../postNotes');
var deleteNotes = require('../deleteNotes');

var CreateItem = React.createClass({displayName: 'CreateItem',
  handleClick: function() {
    this.props.deleteItem(this.props.data);
  },
  render: function() {
    return (
      React.createElement("li", {onClick: this.handleClick}, 
        this.props.data.noteTitle
      )
    );
  }
});

var TodoList = React.createClass({displayName: 'TodoList',
  render: function() {
    var handleDelete = this.props.deleteItem;
    return (
      React.createElement("ol", null, 
        this.props.items.map(function(item){
          return (
            React.createElement(CreateItem, {deleteItem: handleDelete, key: this.props.items[this.props.items.indexOf(item)]._id, data: item})
          );
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
    getNotes(function(data) {
      data.forEach(function(element, index){
        var nextItems = this.state.items.concat([data[index]]);
        this.setState({items: nextItems, text:''});
      }.bind(this));
    }.bind(this));
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleDeleteItem: function(e) {
    deleteNotes(e._id, function(data) {
      if (!data) return false;
        var i = this.state.items.indexOf(e);
        this.state.items.splice(i,1);
        this.setState({items: this.state.items});
    }.bind(this));
  },
  handleSubmit: function(e) {
    e.preventDefault();
    postNotes({noteTitle: this.state.text}, function(data) {
      if (!data) return false;
      var nextItems = this.state.items.concat([{noteTitle: this.state.text, _id: data._id}]);
      var nextText = '';
      this.setState({items: nextItems, text: nextText});
    }.bind(this));
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h3", null, "Notes App"), 
        React.createElement(TodoList, {deleteItem: this.handleDeleteItem, items: this.state.items}), 
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