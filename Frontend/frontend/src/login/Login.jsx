import './Login.css'
import signinImage from '../images/signin-image.jpg'
import {Link, useNavigate} from 'react-router-dom'
import login ,{getlocal} from '../services/UserService'
import {useDispatch, useSelector} from 'react-redux'
import {jwtDecode} from 'jwt-decode'
import {updateAuthToken, updateUser} from '../redux/AuthContext'
import toast from 'react-hot-toast'
import { useEffect } from 'react'


function Login() {
    const navigate = useNavigate();
    const response = getlocal();

    const { user, authToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    

    useEffect(() => {
        if (response) {
            navigate('/');
        }

        
        

    }, [response, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.email.value.trim() === '') {
            toast.error('Please enter email field!');
            return;
        }

        try {
            const response = await login(e);
            const decoded = jwtDecode(response.access);
            console.log(decoded);

            dispatch(updateUser(decoded));
            dispatch(updateAuthToken(response));
            console.log('Login successful');
            navigate('/');
        } catch (err) {
            toast.error('Error occurred. Please check your credentials and try again.');
            console.log('Error occurred:', err);
        }
    };

    return (
        <div>
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src={signinImage} alt="sign up" /></figure>
                            <a className="signup-image-link"><Link to='/register'>Create an Account</Link></a>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Sign In</h2>
                            <form onSubmit={handleSubmit} method="POST" className="register-form" id="login-form" >
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                    <input
                                    type="email"
                                    name="email" 
                                    id="email" 
                                    placeholder="Your Email" 
                                    autoComplete='off'
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="your_pass"  placeholder="Password" />
                                </div>
                                <div className="form-group form-button">
                                    <button type="submit" name="signin" id="signin" className="form-submit">Log in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login