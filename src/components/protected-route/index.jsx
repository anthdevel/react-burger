import {Redirect, Route} from 'react-router-dom';
import {getCookie} from '../../utils';
import {ACCESS_TOKEN} from '../../utils/consts';

const ProtectedRoute = (props) => {
  const {children, ...rest} = props;
  const accessToken = getCookie(ACCESS_TOKEN);

  return (
    <Route
      {...rest}
      render={() =>
        accessToken ? children : (
          <Redirect to="/login"/>
        )
      }
    />
  );
};

export default ProtectedRoute;
