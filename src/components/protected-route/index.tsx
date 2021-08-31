import {Redirect, Route} from 'react-router-dom';
import {hasToken} from '../../utils';

const ProtectedRoute = (props: any) => {
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
