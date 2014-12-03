/** @jsx React.DOM */
/* global React*/

React = require('react');
var getNotes = require('../getNotes');
var c = 0;

var CreateItem = React.createClass({
  render: function() {
    return <li>{this.props.data}</li>;
  }
});

var TodoList = React.createClass({
  render: function() {
    return (
      <ol>
        {this.props.items.map(function(item){
          return <CreateItem key={this.props.items[this.props.items.indexOf(item)]._id} data={item.noteTitle}/>;
        }.bind(this))}
      </ol>
    );
  }
});

var TodoApp = React.createClass({
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