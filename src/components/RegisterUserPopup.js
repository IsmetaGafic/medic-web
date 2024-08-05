import React, { useState } from 'react';
import axios from 'axios';
import './Popup.css'; // Uvjerite se da je ovo put do vašeg CSS fajla

const RegisterUserPopup = ({ onClose, fetchUsers }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    orders: 0,
    image: '',
    dateOfBirth: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', formData);
      fetchUsers(); // Osvježavanje popisa korisnika nakon registracije
      onClose(); // Zatvara popup nakon uspješne registracije
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Register New User</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Orders:
            <input type="number" name="orders" value={formData.orders} onChange={handleChange} min="0" max="10" required />
          </label>
          <label>
            Image:
            <input type="text" name="image" value={formData.image} onChange={handleChange} required />
          </label>
          <label>
            Date of birth:
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </label>
          <button type="submit" className="btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUserPopup;
