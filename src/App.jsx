import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AppHeader from './components/app-header/app-header';
import styles from './App.module.css';
import MainPage from './pages/main/main';

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
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
