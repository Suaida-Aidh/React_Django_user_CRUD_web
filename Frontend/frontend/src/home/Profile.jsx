import { useState, useEffect } from 'react';
import homeImage from '../images/home.webp';
import Navbar from '../navbar/Navbar'
import './Profile.css';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { getlocal } from '../services/UserService';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Profile() {
  
    const {user_id} = jwtDecode(getlocal())
    const [profile_img, setProfileImage] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('') 
    const [password,setPassword] = useState('')

    const [isopen, setIsopen] = useState(false)
    const [user, setUser] = useState({
        username: '',
        email: '',
        profile_img: '',
    })

    const navigate = useNavigate()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

    useEffect(()=>{
        async function getUser(){
            try{
                const response = await axios.get(`http://localhost:8000/users/${user_id}/`)
                setUser(response.data)
                setUsername(response.data.username)
                setEmail(response.data.email)
                // setPassword(response.data.password)

            } catch(error){
                console.log('Failed to fetch user details in profile:',error)
            }
        }
        getUser()
    }, [user_id])
  
    

    const updateProfile = async(e)=>{
        e.preventDefault()

        const formData = new FormData()
        formData.append('username',e.target.username.value)
        formData.append('email',e.target.email.value)
        // formData.append('password',e.target.password.value)
        if (password) {
            formData.append('password', password);
        }
        
        
        formData.append('profile_img',e.target.profile_img.files[0])
        formData.append('is_active',true)



         // Debugging: Log form data entries
         for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }



        try{
            const response = await fetch(`http://localhost:8000/users/${user_id}/`,{
                method: 'PUT',
                body: formData,
            })

            if (!response.ok){
                throw new Error('Failed to update user')
            }

            const updateUser = await response.json()
            setUser(updateUser)

            toast.success('User updated successfully')
            navigate('/profile')
            setIsopen(false)

        }catch (error) {
            console.error('Failed to update user', error)
            toast.error('Failed to update user')



        }

    }

        return (
            <>
            <Navbar />
            
            <div className="profile-container">
            {isopen ? (
                <div className='profile-card'>
                    <form onSubmit={updateProfile}>
                        <div className='form-contain'>

                        <input
                            className='add-user-input'
                            type="text"
                            id='username'
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            defaultValue={user.username}
                            
                            />
                        <input 
                            className='add-user-input'
                            type="email"
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={user.email}
                            />

                            <input
                            className='add-user-input'
                            type="password"
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder={user.password}
                            defaultValue={user.password}
                            />

                            <input
                            type="file"
                            id='profile_img'
                            name='profile_img'
                            onChange={(e) => setProfileImage(e.target.files[0])}
                            />
                            <div style={{width: '100px'}} >
                                {
                                profile_img ?
                                    <img className='w-100' src={URL.createObjectURL(profile_img)} ></img>
                                :
                                    <img className='w-100' src={user.profile_img ? user.profile_img : ""} ></img>
                                }
                            </div>
                        </div>
                        <input className='add-user-button' type='submit' value='Update' />
                        <button type='button' onClick={()=>setIsopen(false)}>Cancel</button>
                    </form>
                </div>
            ):(
                <div className='profile-card'>
                    <img src={user.profile_img ? `http://localhost:8000/${user.profile_img}/`:null} 
                    alt="User Profile"
                     className="user-profile-image"
                      />
                    <h2>{ user.username || 'username' }</h2>
                    <p>Email: {user.email} </p>
                    <p>Phone: +9186 0782 635</p>
                    <button onClick={()=> setIsopen(true)}>Edit Profile</button>
                </div>
            )}
                
            <div className="image-container">
                <img src={homeImage} alt="Home" className="profile-image" />
            </div>
        </div>
    </>
    );
}

export default Profile
