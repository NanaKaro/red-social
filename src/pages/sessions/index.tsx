import { useDispatch } from 'react-redux';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { setUser } from '../../store/features/user/userSlice';
import './styles.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const providerG = new GoogleAuthProvider();
const providerT = new TwitterAuthProvider();
const providerF = new FacebookAuthProvider();

enum SocialNetworks {
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
  TWITTER = 'TWITTER',
}

function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const signIn = async (socialNetwork: string) => {
    let provider = providerG;

    if (socialNetwork === SocialNetworks.FACEBOOK) {
      provider = providerF;
    } else if (socialNetwork === SocialNetworks.TWITTER) {
      provider = providerT;
    }

    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      dispatch(
        setUser({
          name: user.displayName || 'User',
          email: user.email,
          photo: user.photoURL,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log('Auth', currentuser);
      if (currentuser) {
        navigate('/home');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="containerLogin">
      <div className="containerLogin__login">
        <label htmlFor="">Iniciar sesión en Red Social</label>
        <br />
        <br />
        <p>Ingresa a nuestra red social con una de tus cuentas preferida</p>
        <br />
        <div className="socialLogin">
          <button
            type="button"
            className="buttonLogin buttonLogin--gplus"
            onClick={() => signIn(SocialNetworks.GOOGLE)}>
            <em className="buttonLogin__name buttonLogin__name--gp">g+</em>
            <span className="buttonLogin__text">Sign In with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
