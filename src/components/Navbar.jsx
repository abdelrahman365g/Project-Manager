import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm border-bottom py-3">
      <div className="container">
        <Link
          className="navbar-brand fs-4 fw-bold text-primary d-flex align-items-center"
          to="/"
        >
          <i className="fa-solid fa-layer-group me-2"></i> Dashboard
        </Link>

        <div className="d-flex gap-2">
          <Link
            className="btn btn-outline-primary d-flex align-items-center"
            to="/add-project"
          >
            <i className="fa-solid fa-plus me-1"></i> Add Project
          </Link>

          <Link
            className="btn btn-outline-success d-flex align-items-center"
            to="/add-task"
          >
            <i className="fa-solid fa-tasks me-1"></i> Add Task
          </Link>
        </div>
      </div>
    </nav>
  );
}
