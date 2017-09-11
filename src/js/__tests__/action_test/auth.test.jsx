import AuthAction from '../../action/authAction';
import AuthStore from '../../store/UserInfo';
import NotifyStore from '../../store/NotifyStore';

const status = false;
const userinfo = {
  name: 'okoro',
  email: 'okoro@me.com',
};
describe('auth action', () => {
  describe('should have a  function \'getAuthStatus\'', () => {
    expect(AuthAction).toBeInstanceOf(Function);

    it('should dispatch parameter passed', () => {
      AuthAction(status, userinfo);
      expect(AuthStore.isAuth).toBe(status);
    });

    it('should dipatch error for non-boolean parameter', () => {
      AuthAction('ok', userinfo);
      expect(NotifyStore.message).toBe('Invalid datatype');
    });
  });
});

