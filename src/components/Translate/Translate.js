import React, { Component } from "react";
import { Consumer } from "../../context/Context";

class Translate extends Component {
  state = {
    translateEndpoint:
      "https://glosbe.com/gapi/translate?from=pol&dest=eng&format=json&phrase=witaj&pretty=true",
    english: "",
    ibibio: ""
  };

  onInputChanged = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });


  };

  render() {
    const { english, ibibio } = this.state;
    return (
      <div className="translate">
        <div className="row">
          <h2>Translate</h2>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div className="card">
              <div className="card-header">
                <p className="lead">English</p>
              </div>
              <div className="card-body">
                <textarea
                  name="english"
                  className="form-control"
                  value={english}
                  onChange={(e) => this.onInputChanged(e)}
                />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div className="card">
              <div className="card-header">
                <p className="lead">Ibibio</p>
              </div>
              <div className="card-body">
                <textarea
                  name="ibibio"
                  className="form-control"
                  value={ibibio}
                  onChange={(e) => this.onInputChanged(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Translate;
