import {Redirect, Route} from 'react-router-dom';
import {hasToken} from '../../utils';
import {FC} from 'react';

interface IProtectedRouteProps {
  readonly path: string
}

const ProtectedRoute: FC<IProtectedRouteProps> = (props) => {
  const {children, ...rest} = props;

  return (
    <Route
      {...rest}
      render={({location}) =>
        hasToken() ? children : (
          <Redirect
            to={{
              pathname: '/login',
              state: {from: location},
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
