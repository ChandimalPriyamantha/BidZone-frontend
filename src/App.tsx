import React from "react";

import "./App.css";
import { Navebar } from "./layouts/NavbarAndFooter/Navebar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage";
import { SearchAuctionsPage } from "./layouts/SearchAuctions/SearchAuctionsPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { BidPlacePage } from "./layouts/BidPlacePage/BidPlacePage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import { Security, LoginCallback } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import ChatRoom from "./layouts/ChatPage/ChatRoom";

const oktaAuth = new OktaAuth(oktaConfig);

export const  App = () => {

  const customAuthHandler = () =>{
         history.push('/login');
  }

  const history = useHistory();
  
  const restoreOriginalUri = async (__oktaAuth: any, orginalUri: any) =>{
    history.replace(toRelativeUrl(orginalUri || '/', window.location.origin));
  };
  return (
    <div className="d-flex flex-column min-vh-100">
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
    <Navebar/>
     <div className="flex-grow-1">
    <Switch>
    <Route path='/' exact>
      <Redirect to='/home'/>
    <HomePage/>
    </Route>
    <Route path='/home'>
      <HomePage/>
    </Route>
    <Route path='/search'>
    <SearchAuctionsPage/>
    </Route>
    <Route path='/checkout/:bookId'>
      <BidPlacePage/>
    </Route>
    <Route path='/chat'>
      <ChatRoom/>
    </Route>
    <Route path='/login' render={ () => <LoginWidget config={oktaConfig}/>}/>
    <Route path='/login/callback' component={LoginCallback}/>
    </Switch>
    </div>
    <Footer/>
    </Security>
    </div>

  );
}

export default App;
