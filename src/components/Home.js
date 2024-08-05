import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDetailsPopup from './UserDetailsPopup';
import RegisterUserPopup from './RegisterUserPopup';
import './Home.css'; // Dodajemo CSS za Home stranicu
import { useNavigate } from 'react-router-dom'; // Dodajemo useNavigate za navigaciju

const Home = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showRegisterPopup, setShowRegisterPopup] = useState(false);
    const [showUserDetailsPopup, setShowUserDetailsPopup] = useState(false);
    const navigate = useNavigate(); // Inicijaliziramo useNavigate
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
          const response = await axios.get('http://localhost:5000/users');
          setUsers(response.data);
      } catch (error) {
          console.error('Failed to fetch users:', error);
      }
  };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowUserDetailsPopup(true);
    };

    const handleLogout = () => {
      navigate('/'); // Preusmjeravamo korisnika na stranicu za prijavu// Ovdje dodajte logiku za odjavu
        console.log('Logout');
    };

    return (
        <div className="home-container">
          <h1>MedicLab</h1>
            <div className="home-header">
                <button className="register-button" onClick={() => setShowRegisterPopup(true)}>Register New User</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            <h2 className="home-user">Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id} onClick={() => handleUserClick(user)}>
                        {user.username} - Last login: {new Date(user.lastLogin).toLocaleString()}
                    </li>
                ))}
            </ul>
            {showRegisterPopup && <RegisterUserPopup onClose={() => setShowRegisterPopup(false)} fetchUsers={fetchUsers} />}
            {showUserDetailsPopup && selectedUser && (
                <UserDetailsPopup user={selectedUser} onClose={() => setShowUserDetailsPopup(false)}fetchUsers={fetchUsers} />
            )}
        </div>
    );
};

export default Home;
