import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Loader.css'; // Dodajemo CSS za loader
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State za loader
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Pokrećemo loader
        setError('');

        try {
            // Simuliramo kašnjenje od 2 sekunde
            //await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await axios.post('http://localhost:5000/login', { username, password });
            if (response.status === 200) {
                navigate('/home');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false); // Isključujemo loader
        }
    };

    return (
        <div>
            {loading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}
            <h1>MedicLab</h1>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
