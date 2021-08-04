import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AppHeader from '../app-header';
import styles from './styles.module.css';
import {
  FeedPage,
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';

function App() {
  return (
    <Router>
      <div className={styles.root}>
        <AppHeader/>
        <main className={styles.main}>
          <Switch>
            <Route path="/" exact>
              <MainPage/>
            </Route>
            <Route path="/login" exact>
              <LoginPage/>
            </Route>
            <Route path="/register" exact>
              <RegisterPage/>
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPasswordPage/>
            </Route>
            <Route path="/reset-password" exact>
              <ResetPasswordPage/>
            </Route>
            <Route path="/feed" exact>
              <FeedPage/>
            </Route>
            <Route path="/profile" exact>
              <ProfilePage/>
            </Route>
            <Route>
              <NotFoundPage/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;