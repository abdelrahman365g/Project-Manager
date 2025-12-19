import { useNavigate } from 'react-router-dom';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3 mb-4 shadow-sm">
      <div className="container">
        <span className="navbar-brand fw-bold text-primary">Project Manager</span>
        
        <div className="d-flex align-items-center">
          {user ? (
            <>
              <span className="me-3 text-secondary">Welcome, {user.firstName}!</span>
              <button className="btn btn-outline-danger btn-sm px-3" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <span className="text-secondary">Guest Mode</span>
          )}
        </div>
      </div>
    </nav>
  );
}