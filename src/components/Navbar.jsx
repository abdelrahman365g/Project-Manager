import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" border-bottom shadow-sm">
      <div className="container d-flex justify-content-between my-4">
        <Link className="header-brand fs-4 fw-bold text-decoration-none" to="/">Dashboard</Link>
        <div className="d-flex gap-3 me-3">
          <Link className="btn btn-primary" to="/add-project">
            Add Project
          </Link>
          <Link className="btn btn-primary" to="/add-task">
            Add Task
          </Link>
        </div>
      </div>
    </nav>
  );
}
