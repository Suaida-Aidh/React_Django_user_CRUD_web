import './Navbar.css'
import {Link,useNavigate} from 'react-router-dom'
import { getlocal } from '../services/UserService'
import { jwtDecode } from 'jwt-decode'

function Navbar() {
  let {is_admin} = jwtDecode(getlocal())
  const navigate = useNavigate()

  const logout=()=>{
    localStorage.removeItem('authToken')
    navigate('/login')
  }
  return (
    <div>
        <nav className="navbar bg-lightblue">
        
        <div className="container-fluid">
          <h3 className="text-light m-2 ">Website</h3>
            <div className="d-flex">
              {!is_admin &&
                  <>
                    <a className="navbar-brand"><Link to='/' >Home</Link></a>
                    <a className="navbar-brand"><Link to='/profile' >Profile</Link></a>
                  </>
               }
               
                <button className='bttn' onClick={logout}>logout</button>
            </div>
        </div>
      </nav>  
    </div>
  )
}

export default Navbar