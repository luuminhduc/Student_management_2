import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import config from './firebase/config';
import firebase from 'firebase';
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Alerts from './components/Alerts';
import Login from './pages/Login';
import Register from './pages/Register';
import EditStudent from './components/EditStudent';
import EditClass from './components/EditClass';
import Container from './components/Container';
import SingleClass from './pages/SingleClass';
import Modal from './components/Modal';

const rrfProps = {
  firebase,
  config,
  dispatch: store.dispatch,
}

const AuthIsLoaded = ({children}) => {
  const auth = useSelector(state=>state.firebaseReducer.auth);
  if(!isLoaded(auth)) return "";
  return children;
}

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <Router>
            <Alerts/>
            <Modal/>
            <Switch>
              <Route exact path="/">
                <React.Fragment>
                  <Header/>
                  <Container>
                  <Home/>
                  </Container>
                </React.Fragment>
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route exact path="/register">
                <Register/>
              </Route>
              <Route exact path="/editClass">
                <React.Fragment>
                  <Header/>
                  <Container>
                  <EditClass/>
                  </Container>
                </React.Fragment>
              </Route>
              <Route exact path="/editStudent">
                <React.Fragment>
                  <Header/>
                  <Container>
                  <EditStudent/>
                  </Container>
                </React.Fragment>
              </Route>
              <Route exact path="/class/:classId">
                <React.Fragment>
                  <Header/>
                  <Container>
                  <SingleClass/>
                  </Container>
                </React.Fragment>
              </Route>
            </Switch>
          </Router>
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
 
export default App;