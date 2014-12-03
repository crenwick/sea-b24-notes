/** @jsx React.DOM */
/* global React*/

React = require('react');
var getNotes = require('../getNotes');
var c = 0;

var TodoList = React.createClass({
  render: function() {
    var keyId = this.props.items.index;
    console.log('length num', this.props);
    var createItem = function(itemText) {
      c++;
      console.log('keyId:', keyId);
      console.log('c:', c);
      return <li>{itemText}</li>;
    };
    return <ol>{this.props.items.map(createItem)}</ol>;
  }
});

var TodoApp = React.createClass({
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