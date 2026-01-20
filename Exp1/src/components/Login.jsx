import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (username && password) {
      const result = login(username, password);
      if (!result.success) {
        setError(result.message);
      }
    }
  };

  return (
    <div className="card login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Login</button>
        <p style={{ marginTop: '10px', fontSize: '0.9em' }}>
          Don't have an account? <span style={{ color: '#1877f2', cursor: 'pointer', textDecoration: 'underline' }} onClick={onSwitchToRegister}>Register here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
