import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      const result = register(username, password, role);
      if (result.success) {
        onSwitchToLogin();
      } else {
        setError(result.message);
      }
    } else {
      setError('Please fill all fields');
    }
  };

  return (
    <div className="card login-container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
        <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
          Already have an account? <span style={{ color: '#1877f2', cursor: 'pointer', textDecoration: 'underline' }} onClick={onSwitchToLogin}>Login here</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
