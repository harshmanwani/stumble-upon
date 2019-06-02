import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header';
// import Footer from './Footer';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Login from './Login';
import Search from './Search';
import About from './About';

import '../styles/fonts.css';
import '../styles/App.sass';

class App extends Component {

  state = {
    theme: 0
  }

  themeToggle = () => {
    console.log("changing theme");
    if(this.state.theme){
      document.body.style.backgroundColor = '#fff';
      this.setState({ theme: 0 })
    } else {
      document.body.style.backgroundColor = '#282c35';
      this.setState({ theme: 1 })
    }
  }

  render(){
    return (
      <div className={this.state.theme ? "app dark" : "app"}>
        <Header themeToggle={this.themeToggle}/>
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
        {/* <Footer/> */}
      </div>
    ) 
  }
}

export default App;
