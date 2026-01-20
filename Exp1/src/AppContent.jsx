import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProductManager from './components/ProductManager';

const AppContent = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <header>
        <h1>Shop App</h1>
        {isLoggedIn && (
          <div>
            <span>Welcome, {user.name} ({user.role})</span>
            <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
          </div>
        )}
      </header>

      <main>
        {!isLoggedIn ? (
          showRegister ? (
            <Register onSwitchToLogin={() => setShowRegister(false)} />
          ) : (
            <Login onSwitchToRegister={() => setShowRegister(true)} />
          )
        ) : (
          <ProductManager />
        )}
      </main>
    </div>
  );
};

export default AppContent;
