import  { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';

function AddUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.trim() === '') {
      toast.error('Please enter username');
      return;
    } else if (!emailRegex.test(email)) {
      toast.error('Enter a valid email id');
      return;
    } else if (password !== confirmPassword) {
      toast.error('Password did not match!');
      return;
    } else if (password.length < 6) {
      toast.error('Password should contain at least six characters!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400) {
          toast.error(data.message || 'Username or Email already exists');
        } else {
          throw new Error(data.message || 'Failed to add user');
        }
      } else {
        navigate('/');
        toast.success('User created successfully!');
      }
    } catch (err) {
      console.error('Error adding user:', err);
      toast.error('Failed to add user');
    }
  };

  return (
    <div>
      <Toaster position="top-left" reverseOrder={false}></Toaster>
      <div className="">
        <div className="container p-5">
          <form onSubmit={handleSubmit}>
            <h2>Add new user</h2>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                aria-describedby="emailHelp"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='username'
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
        
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
              />
            </div>
            <button type="submit" className="loginbtn">
              Create user
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
