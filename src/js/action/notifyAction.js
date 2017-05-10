import Dispatcher from '../dispatcher/Dispatcher';

const getNotification = (message) => {
  Dispatcher.dispatch({
    Type: 'GET-NOTIFY',
    message,
  });
};

export default getNotification;
