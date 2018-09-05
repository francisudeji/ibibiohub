import React, { Component } from 'react';

const Context = React.createContext()

export class Provider extends Component {

  state = {
    dictionary: {},
    heading: 'Translate'
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