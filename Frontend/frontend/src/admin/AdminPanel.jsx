import { useEffect, useState } from 'react';
import './AdminPanel.css'; // Ensure the correct path to your CSS file
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
// import '@fortawesome/fontawesome-free/css/all.min.css';


function AdminPanel() {
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const history = useNavigate();
  // const { user_id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function getUserList() {
      const response = await axios.get('http://localhost:8000/users/');
      setUserList(response.data);
      setFilteredUserList(response.data);
    }
    getUserList();
  }, []);

  const userUpdateForm = async (e) => {
    e.preventDefault();
    const updatedPassword = password ? password : selectedUser.password

    const response = await fetch(`http://localhost:8000/users/${selectedUser.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password: updatedPassword // Keeping the original password
      })
    });

    if (!response.ok) {
      toast.error('Failed to update user');
    } else {
      toast.success('User updated successfully');
      setIsOpen(false);
      const updateResponse = await axios.get('http://localhost:8000/users/')
      setUserList(updateResponse.data)
      setFilteredUserList(updateResponse.data)
      history('/');
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/users/${id}/`).then(() => {
          axios.get('http://localhost:8000/users').then(response => {
            setUserList(response.data);
            setFilteredUserList(response.data);
          });
        })
      }
    })
  }

  const openEditModal = (user) => {
    setSelectedUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setIsOpen(true);
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredUsers = userList.filter(user =>
      user.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
      user.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUserList(filteredUsers);
  }

  return (
    <div className="main-container">
      <div className="sidebar">
        <Link to='/adduser'>Add User</Link>
      </div>
      <div className="content-container">
        <div className="user-list-container">
          <h2 className="table-title">User List</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <i className="fas fa-search search-icon"></i>
          </div>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td className="action-links">
                    <a href='#' className="delete" onClick={() => handleDelete(user.id)}>Delete</a>
                    <a href='#' className="settings" onClick={() => openEditModal(user)}>Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <form className="add-user-form" onSubmit={userUpdateForm}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update User</h5>
                  <button type="button" className="close" onClick={() => setIsOpen(false)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="username"></label>
                    <input type="text" name='username' className="form-control" id="username" placeholder="Enter username"
                      value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"></label>
                    <input type="email" className="form-control" name='email' id="email" placeholder="Enter email"
                      value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"></label>
                    <input type="password" name='password' className="form-control" id="password" placeholder="Enter password"
                      value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>Close</button>
                  <button type="submit" className="btn btn-warning">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
