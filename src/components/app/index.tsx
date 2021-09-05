import React, {FC, useEffect} from 'react';
import {Switch, Route, useHistory, useLocation} from 'react-router-dom';
import AppHeader from '../app-header';
import styles from './styles.module.css';
import {
  FeedPage,
  ForgotPasswordPage, IngredientPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';
import ProtectedRoute from '../protected-route';
import Modal from '../modal';
import IngredientDetails from '../ingredient-details';
import {getIngredientsFetch} from '../../services/actions/ingredients';
import {useDispatch} from '../../services/hooks';

interface ILocationState {
  readonly background: {
    readonly hash: string
    readonly pathname: string
    readonly search: string
    readonly state: undefined
  }
}

const App: FC = () => {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const dispatch = useDispatch();

  const background = history.action === 'PUSH' && location.state && location.state.background;

  const onCloseModal = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getIngredientsFetch());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <AppHeader/>
      <main className={styles.main}>
        <Switch location={background || location}>
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
          <ProtectedRoute path="/profile">
            <ProfilePage/>
          </ProtectedRoute>
          <Route path="/ingredients/:id">
            <IngredientPage/>
          </Route>
          <Route>
            <NotFoundPage/>
          </Route>
        </Switch>

        {background && (
          <Route path="/ingredients/:id">
            <Modal title="Детали ингредиента" onClose={onCloseModal}>
              <IngredientDetails/>
            </Modal>
          </Route>
        )}
      </main>
    </div>
  );
};

export default App;