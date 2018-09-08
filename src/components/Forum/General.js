import React, { Component } from "react";
import axios from "axios";
import  avatar  from '../../img/avatar.png'

const Comment = props => {
  console.log(props);
  return (
    <div className="card card-body mb-2">
      <p>
        <img src={avatar} width="30px" height="30px" alt="avatar" />&nbsp;&nbsp;&nbsp;
        <strong>{props.details.email}</strong>
        &nbsp;&nbsp;&nbsp;
        <small>{new Date().toISOString().split("T")[0]}</small>
      </p>

      <p>{props.details.body}</p>
    </div>
  );
};

class General extends Component {
  state = {
    url: "https://jsonplaceholder.typicode.com/comments",
    comments: []
  };

  componentDidMount() {
    axios
      .get(this.state.url)
      .then(res =>
        this.setState({ comments: [...res.data] }, () => {
          console.log(this.state.comments);
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h5>General</h5>
        {this.state.comments.length > 0
          ? this.state.comments
              .splice(0, 10)
              .map(comm => <Comment key={comm.id} details={comm} />)
          : "loading..."}
      </div>
    );
  }
}

export default General;
