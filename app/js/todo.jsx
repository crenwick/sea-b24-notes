/** @jsx React.DOM */
/* global React*/

React = require('react');
var getNotes = require('../getNotes');

var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ol>{this.props.items.map(createItem)}</ol>;
  }
});

var TodoApp = React.createClass({
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
      <div>
        <h3 onClick={this.handleClick}>Notes App</h3>
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

React.render(<TodoApp />, document.getElementById('todo'));