// components/LogoutButton.js
"use client";

const LogoutButton = () => {
    const handleLogout = () => {
      
      console.log('Logging out...');
      
      window.location.href = '/login';
    };
  
    return (
      <button
        onClick={handleLogout}
        style={{
          padding: '10px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    );
  };
  
  export default LogoutButton;
  