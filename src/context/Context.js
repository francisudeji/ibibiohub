import React, { Component } from 'react';

const Context = React.createContext()

const reducer = (state, action) => {
  if (action.type === "ADD_POSTS") {
    return { ...state, posts: state.posts.push(action.payload) };
  }
};

export class Provider extends Component {

  state = {
    dictionary: {},
    heading: 'Translate',
    posts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }

}

export const Consumer = Context.Consumer