import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
const DashBoard = () => <h2>DashBoard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  render(){
    return (
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route path="/" component={Landing} exact={true}/>
            <Route path="/surveys" component={DashBoard} exact />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      );
  }
};

export default connect(null, actions)(App);
