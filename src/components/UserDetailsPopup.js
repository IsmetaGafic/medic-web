import React, { useState } from 'react';
import axios from 'axios';
import './Popup.css'; // Uvjerite se da je ovo put do vašeg CSS fajla

const UserDetailsPopup = ({ user, onClose, fetchUsers }) => {
  const [formData, setFormData] = useState(user);

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
      await axios.put(`http://localhost:5000/users/update/${user.id}`, formData);
      fetchUsers(); // Osvježavanje popisa korisnika nakon ažuriranja
      onClose(); // Zatvara popup nakon uspješnog ažuriranja
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleBlockUser = () => {
    axios.post(`http://localhost:5000/users/block/${user.id}`)
      .then(response => {
        console.log('User blocked:', response.data);
        fetchUsers(); // Osvježavanje popisa korisnika nakon blokiranja
        onClose();
      })
      .catch(error => {
        console.error('Error blocking user:', error);
      });
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>User Details</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
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
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth.split('T')[0]} onChange={handleChange} required />
          </label>
          <button type="submit" className="btn">Update</button>
          <button type="button" className="btn" onClick={handleBlockUser}>Block User</button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
