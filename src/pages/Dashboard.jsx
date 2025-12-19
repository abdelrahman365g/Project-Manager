import { Link, useNavigate } from "react-router-dom";

export default function Dashboard({ projects, setProjects }) {
  const navigate = useNavigate();

  const deleteProject = (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="container mt-3">
      <h1 className="fw-bold my-3">Projects</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gap-3">
        {projects.map((p) => (
          <div className="card shadow-sm border p-3 rounded-4" key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>Tasks: {p.tasks.length}</p>

            <div className="d-flex gap-2 mt-2">
              <Link
                className="btn btn-outline-secondary"
                style={{ width: "fit-content" }}
                to={`/project/${p.id}`}
              >
                View Tasks
              </Link>

              <button
                className="btn btn-warning"
                onClick={() => navigate("/add-project", { state: { project: p } })}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => deleteProject(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
