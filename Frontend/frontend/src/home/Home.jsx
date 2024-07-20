import './Home.css';
import homeImage from '../images/home.webp';
import { getlocal } from '../services/UserService';
import { jwtDecode } from 'jwt-decode';
function Home() {
  let {username} = jwtDecode(getlocal())
  return (
    <>
    
    <div className="home-container">


      <div className="left-column">
        <img src={homeImage} alt="Home" className="home-image" />
      </div>
      <div className="right-column">
        <h2>WELCOME {username}....</h2>
        <h3>Here Is Your HomePage</h3>
      </div>
    </div>
    </>
  );
}

export default Home;
