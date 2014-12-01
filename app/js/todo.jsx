/** @jsx React.DOM */
React = require('react');
var getNotes = require('../getNotes');
var notes = [];

var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var TodoApp = React.createClass({
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
      <div>
          <h3>Notes App</h3>
          <TodoList items={this.state.items} />
          <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}
      </button>
      </form>
      </div>
    );
  }
});

getNotes(function(x) {
  var l = x.length;
  for (var i = 0; i < l; i++) {
    notes.push(x[i].noteTitle);
  }
  React.render(<TodoApp />,
               document.getElementById('todo')); 
});
