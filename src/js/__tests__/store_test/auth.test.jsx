import AuthStore from '../../store/UserInfo';
import Dispatcher from '../../dispatcher/Dispatcher';
import * as Constant from '../../constants';
import Mockdata from '../../__mocks__/mockData';

describe('auth store', () => {
  it('should have a default auth status: "false" ', () => {
    expect(AuthStore.isAuth).toBe(false);
  });

  it('should haveaf function \'updateAuth\' that update the isauth property',
  () => {
    const status = true;
    expect(AuthStore.updateUserInfo).toBeInstanceOf(Function);
    AuthStore.updateUserInfo(status, Mockdata.userInfo);
    expect(AuthStore.isAuth).toBe(status);
  });

  it('should listen to "GET-NOTIFY" event', () => {
    const status = true;

    Dispatcher.dispatch({
      Type: Constant.GET_AUTH_STATUS,
      status,
    });
    expect(AuthStore.isAuth).toBe(status);
  });
});


