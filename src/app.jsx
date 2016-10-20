import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>Pomodoro Clock</h1>
        </div>
        <div className="row">
          <div className="col-xs-3 offset-xs-3">
            <h5>
              BREAK LENGTH
            </h5>
          </div>
          <div className="col-xs-3">
            <h5>
              SESSION LENGTH
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3 offset-xs-3">
            <h2>
              - 5 +
            </h2>
          </div>
          <div className="col-xs-3">
            <h2>
              - 25 +
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="offset-xs-4 col-xs-4">
            <div className="round">
              <span>
                SESSION
                <br />
                <br />
                <br />
                22:53
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}