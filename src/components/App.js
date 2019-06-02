import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Login from './Login';
import Search from './Search';
import About from './About';

import '../styles/fonts.css';
import '../styles/App.sass';

class App extends Component {
  render(){
    return (
      <div className="app">
        <Header/>
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to='/new/1' />}/>
            <Route exact path="/create" component={CreateLink}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/top" component={LinkList}/>
            <Route exact path="/new/:page" component={LinkList}/>
          </Switch>
        </div>
      </div>
    ) 
  }
}

export default App;
