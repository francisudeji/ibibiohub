import React, { Component } from "react";
import { Consumer } from "../../context/Context";
import axios from "axios";
import Spinner from 'react-spinner-material';

class Translate extends Component {
  state = {
    english: "",
    ibibio: "",
    from: "",
    to: "",
    isloading: false,
    endpoint: "",
    error: ""
  };

  onInputChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getTranslationData = (from, to, isToIbb) => {
    axios
      .get(this.state.endpoint)
      .then(res => {
        console.log(res.data);
        if (res.data.result === "ok") {
          if (isToIbb) {
            const ibibio = res.data.tuc[0].phrase.text;
            this.setState({
              ibibio,
              isloading: false
            });
          } else {
            console.log(res.data);
            const english = res.data.tuc[0].phrase.text;
            this.setState({
              english,
              isloading: false
            });
          }
        }
      })
      .catch(err => {
        if (err) {
          this.setState({
            error: "Could not find word in the dictionary",
            isloading: false
          });
        }
      });
  };

  translateTo = targetLang => {
    if (targetLang === "ibibio") {
      if (this.state.english === "")
        this.setState(
          {
            error: "Input field cannot be empty",
            isloading: false
          },
          () => false
        );
      this.setState(
        {
          from: "eng",
          to: "ibb",
          ibibio: "",
          isloading: true,
          endpoint: `https://cors-anywhere.herokuapp.com/https://glosbe.com/gapi/translate?from=eng&dest=ibb&format=json&phrase=${this.state.english.toLocaleLowerCase()}&pretty=true`
        },
        () => this.getTranslationData(this.state.from, this.state.to, true)
      );
    }

    if (targetLang === "english") {
      if (this.state.ibibio === "")
        this.setState(
          {
            error: "Input field cannot be empty",
            isloading: false
          },
          () => false
        );
      this.setState(
        {
          from: "ibb",
          to: "eng",
          english: "",
          isloading: true,
          endpoint: `https://cors-anywhere.herokuapp.com/https://glosbe.com/gapi/translate?from=ibb&dest=eng&format=json&phrase=${this.state.ibibio.toLocaleLowerCase()}&pretty=true`
        },
        () => this.getTranslationData(this.state.from, this.state.to, false)
      );
    }
  };

  render() {
    const styles = {
      fontSize: {
        "fontSize": "30px"
      }
    }
    const { english, ibibio, isloading, error } = this.state;
    return (
      <div className="translate mt-5">
        <div className="row">
          <div className="col-6">
            <h3>Translate</h3>
          </div>
          <div className="col-6 text-right float-right">
            {isloading === true ? (
              <div>
               <Spinner
                size={50}
                spinnerColor={"#333"}
                spinnerWidth={2}
                visible={true} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row">
          {error !== "" ? (
            <div
              className="alert alert-danger mx-auto"
              style={{ width: "94%" }}
            >
              {error}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-6">
                    <p className="lead">English</p>
                  </div>
                  <div className="col-6 text-right">
                    <button
                      onClick={e => this.translateTo("ibibio")}
                      className="btn btn-primary"
                    >
                      translate
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <textarea
                  required
                  rows="3"
                  name="english"
                  className="form-control"
                  value={english}
                  onChange={e => this.onInputChanged(e)}
                  style={styles.fontSize}
                />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-6">
                    <p className="lead">ibibio</p>
                  </div>
                  <div className="col-6 text-right">
                    <button
                      onClick={e => this.translateTo("english")}
                      className="btn btn-primary"
                    >
                      translate
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <textarea
                  required
                  rows="3"
                  name="ibibio"
                  className="form-control"
                  value={ibibio}
                  onChange={e => this.onInputChanged(e)}
                  style={styles.fontSize}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row text-center mt-3" />
      </div>
    );
  }
}

export default Translate;
