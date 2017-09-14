/**
 * CANNOT use `import` to import `es5-shim`,
 * because `import` will be transformed to `Object.defineProperty` by babel,
 * `Object.defineProperty` doesn't exists in IE8,
 * (but will be polyfilled after `require('es5-shim')` executed).
 */

require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

/**
 * CANNOT use `import` to import `react` or `react-dom`,
 * because `import` will run `react` before `require('es5-shim')`.
 */
import React from 'react';
import ReactDOM from 'react-dom';


//const React = require('react');
//const ReactDOM = require('react-dom');
//var marked = require('react-markdown');


var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
  id: 1,
  handleCommentSubmit: function(comment) {
    setTimeout(x=>{
      var comments = this.state.data;
      comment.id = Date.now();
      var newComments = comments.concat([comment]);
      this.setState({data: newComments});
    }, 500);
  },
  getInitialState: function() {
    return {data: this.props.data};
  },
  componentDidMount: function() {
    // setInterval(x=>{
    //   var data = [
    //     {id: 1, author: "APete Hunt", text: "This is one comment"},
    //     {id: 2, author: "BJordan Walke", text: "This is *another* comment"}
    //   ];
      
    //   data[0].text = this.id++;;
    //   this.setState({data: data});
    // }, 1000);
    setTimeout(function(){
      var data = [
        {id: 1, author: "APete Hunt", text: "This is one comment"},
        {id: 2, author: "BJordan Walke", text: "This is *another* comment"}
      ];
      
      data[0].text = this.id++;;
      this.setState({data: data});
    }.bind(this), 1000);
  },
  render: function(){
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

function Button(props){
  return <button type="submit">{props.label}</button>;
}

const InputForm =
<form target="_blank" action="https://google.com/search">
  <div>Enter input and click Search</div>
  <input className="big-input" name="q" />
  <Button label="Search" />
</form>;

const RandomValue = () => 
<div>
  { Math.floor(Math.random() * 100) }
</div>;

const Doubler = ({value=[1, 2, 3]}) =>
<div>
  {value.map(e => e * 2)}
</div>;

class ButtonE extends React.Component {
  
  constructor(props) {
    super(props);
    this.id = Date.now();
    this.state = {count: props.initialCount};

    this.handleClick = this.handleClick.bind(this);
  }

	handleClick(){
    alert(`Clicked: ${++this.clickCounter}`);
  };
  
  render() {
    return (
      <button id={this.id} onClick={this.handleClick}>
        {this.props.label}
      </button>
    );
  }
}


ReactDOM.render(
  <CommentBox data={data}/>,
  //<Button label="save" />,
  //<Button label="Save1" />,
  //<Doubler value={[3,5,9]} />,
  //InputForm,
  document.getElementById('content')
);

var Hello = React.createClass({
  render: function(){
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(
  //<h1>Hello World</h1>,
  <Hello name="world!" />,
  document.getElementById('app')
);
