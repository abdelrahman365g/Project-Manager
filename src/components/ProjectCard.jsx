import { Link } from "react-router-dom";

export default function ProjectCard({ project, onDelete }) {
  return (
    <div className="card p-3">
      <h4 className="fw-bold">{project.title}</h4>
      <p className="text-muted">{project.description}</p>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="badge bg-secondary">
          {project.tasks.length} tasks
        </span>

        <div className="d-flex gap-2">
          <Link
            to={`/project/${project.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            <i className="fa-solid fa-eye"></i>
          </Link>

          <Link
            to={`/add-project/${project.id}`}
            state={{ project }}
            className="btn btn-outline-warning btn-sm"
          >
            <i className="fa-solid fa-pen"></i>
          </Link>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(project.id)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
