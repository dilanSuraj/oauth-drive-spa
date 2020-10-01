import Axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import FilesComponent from './components/FilesComponent';
import SignInComponent from './components/SignIn';
import common from './utils/common';
import { ProtectedRoute } from './utils/protectedRoute';
import notificationAlertUtil from './utils/notificationManager'
import queryString from 'query-string'
import auth from './utils/auth';
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token: ''
    }
  }

  async componentWillMount() {
    const queryObj = queryString.parse(window.location.search);
    let code = queryObj.code
    if (window.location.pathname === "/redirect") {
      const queryObj = queryString.parse(window.location.search);
      let code = queryObj.code
      await Axios.post(`${common.BACKEND_API}${common.TOKEN_ENDPOINT}/`, {
        code: code
      },
        {
          headers: common.DEFAULT_HEADER_INFO
        }).then(res => {
          this.setState({
            token: res.data
          })
          auth.login(res.data);
          window.history.pushState({}, null, '/');
        }).catch(error => {
          notificationAlertUtil.customErrorAlert("Error occurred")
          window.history.pushState({}, null, '/');
        });
    }


  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" name="Sign In Page" component={FilesComponent} />
            <ProtectedRoute exact path="/files" name="Files" component={FilesComponent} />
            <Route exact path="/register" name="Sign In Page" component={SignInComponent} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
