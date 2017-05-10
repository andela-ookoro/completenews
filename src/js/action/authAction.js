
import Dispatcher from '../dispatcher/Dispatcher';

const getAuthStatus = (status) => {
  Dispatcher.dispatch({
    Type: 'AUTH',
    status,
  });
};

export default getAuthStatus;
