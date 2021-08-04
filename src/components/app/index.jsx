import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AppHeader from '../app-header';
import styles from './styles.module.css';
import MainPage from '../../pages/main';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import FeedPage from '../../pages/feed';
import ProfilePage from '../../pages/profile';
import NotFoundPage from '../../pages/not-found';

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