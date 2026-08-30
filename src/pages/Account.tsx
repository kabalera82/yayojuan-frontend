import {useAuth} from '../hooks/useAuth';
import Auth from './Auth';
import UserForm from '../components/forms/UserForm';
import UpdatePasswordForm from '../components/forms/UpdatePasswordForm';
import {LogoutButton} from '../components/button/LogoutButton';

const Account = () => {
  const {user} = useAuth();

  if (!user) {
    return (
      <>
        <Auth />
        <UserForm mode="register" />
      </>
    );
  }

  return (
    <>
      <LogoutButton />
      <UpdatePasswordForm />
      <UserForm mode="update" />
    </>
  );
};

export default Account;
