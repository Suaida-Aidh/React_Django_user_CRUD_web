import  { useState } from 'react'
import './Signup.css'
import signupImage from '../images/signup-image.jpg' //
import { useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function Signup() {

    const navigate=useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conformPassword, setConformPassword] = useState('')

    const signup =(e) =>{
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (username.trim()==''){
            toast.error('Please enter usrname!')
            return
        }else if (!emailRegex.test(email)){
            toast.error('Enter a valid Email id!')
            return
        }else if (password!==conformPassword){
            toast.error('Password did not match!')
            return
        }else if(password.length<6){
            toast.error('Passoword should contain atleast six character!')
            return
        }

        try{
            
            const response = fetch('http://localhost:8000/users/',{
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    username,
                    email,
                    password
                })

            })
            console.log(response)
            if(response.status===400){
                toast.error('Username or Email id already exist!')
                navigate('/register')
            }else{
                toast.success('User Registerd successfully!')
                navigate('/login')
            }
        }

        catch(err){
            console.log(err)
            toast.error('Some error occured:',err)
            navigate('/register')
        }
    }

  return (
    <div>
       <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form onSubmit={signup} method="POST" className="register-form" id="register-form">
                            <div className="form-group">
                                <label  htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="name" id="name" placeholder="Your Name" onChange={(e)=>setUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" id="email" placeholder="Your Email" onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="pass" id="pass" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" onChange={(e)=>setConformPassword(e.target.value)}/>
                            </div>
                            
                            <div className="form-group form-button">
                                <button type="submit" name="signup" id="signup" className="form-submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={signupImage} alt="sing up image" /></figure>
                        <a href="#" className="signup-image-link"><Link to='/login' >I am already member</Link></a>

                    </div>
                </div>
            </div>
        </section>

    </div>
  )
}

export default Signup;


