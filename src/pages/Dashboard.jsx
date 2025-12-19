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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded-3 shadow-sm">
        <h1 className="fw-bold h3 m-0 text-dark">My Projects</h1>
        <button 
          className="btn btn-primary fw-bold shadow-sm px-4"
          onClick={() => navigate("/add-project")}
        >
          + Create Project
        </button>
      </div>

      <div className="row g-4"> 
        {projects.length > 0 ? (
          projects.map((p) => (
            <div className="col-12 col-md-6 col-lg-4" key={p.id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 p-3 transition-card">
                <div className="card-body">
                  <h3 className="h5 fw-bold text-primary">{p.title}</h3>
                  <p className="text-muted small">{p.description}</p>
                  <span className="badge bg-light text-dark border mb-3">
                    {p.tasks.length} Tasks
                  </span>

                  <div className="d-flex gap-2 border-top pt-3">
                    <Link
                      className="btn btn-sm btn-outline-primary flex-grow-1"
                      to={`/project/${p.id}`}
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => navigate("/add-project", { state: { project: p } })}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteProject(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5 py-5 bg-white rounded-4 shadow-sm">
            <p className="text-muted mb-4">No projects found. Start by creating one!</p>
            <button className="btn btn-primary btn-lg px-5" onClick={() => navigate("/add-project")}>
              Add Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}