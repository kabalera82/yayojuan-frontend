import './Account.css';
import {useAuth} from '../hooks/useAuth';
import {Button} from '../components/button/Button';
import LoginForm from '../components/forms/LoginForm';
import UserForm from '../components/forms/UserForm';
import UpdatePasswordForm from '../components/forms/UpdatePasswordForm';
import AddressForm from '../components/forms/AddressForm';

const Account = () => {
  const {user, logout} = useAuth();

  if (!user) {
    return (
      <section className="account">
        <LoginForm />
        <UserForm mode="register" />
      </section>
    );
  }

  return (
    <section className="account">
      <UserForm mode="update" />
      <AddressForm />
      <div>
        <UpdatePasswordForm />
        <div className="account__logout">
          <Button variant="danger" block onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Account;
