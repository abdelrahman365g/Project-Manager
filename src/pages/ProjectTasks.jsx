import { useParams, Link, useNavigate } from "react-router-dom";

export default function ProjectTasks({ projects, setProjects }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === Number(id));
  const statuses = ["To Do", "In Progress", "Done"];

  if (!project) return <p className="text-center mt-5">Project not found</p>;

  const moveTask = (taskId, direction) => {
    const updatedProjects = projects.map((p) =>
      p.id === project.id
        ? {
            ...p,
            tasks: p.tasks.map((t) => {
              if (t.id !== taskId) return t;
              const currentIndex = statuses.indexOf(t.status);
              let newIndex =
                direction === "left"
                  ? Math.max(0, currentIndex - 1)
                  : Math.min(statuses.length - 1, currentIndex + 1);
              return { ...t, status: statuses[newIndex] };
            }),
          }
        : p
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const deleteTask = (taskId) => {
    if (!window.confirm("Delete this task?")) return;
    const updatedProjects = projects.map((p) =>
      p.id === project.id
        ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
        : p
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const renderColumn = (status) => (
    <div className="task-list">
      {project.tasks
        .filter((t) => t.status === status)
        .map((t) => (
          <div className="card border-0 shadow-sm mb-3 rounded-3" key={t.id}>
            <div className="card-body p-3">
              <h5 className="fw-bold h6 text-dark mb-2">{t.title}</h5>
              <p className="text-muted small mb-3">{t.description}</p>
              
              <div className="d-flex justify-content-between align-items-center border-top pt-2">
                <div className="d-flex gap-1">
                  <button className="btn btn-light btn-sm text-warning" onClick={() => navigate("/add-task", { state: { task: t, projectId: project.id } })}>
                    Edit
                  </button>
                  <button className="btn btn-light btn-sm text-danger" onClick={() => deleteTask(t.id)}>
                    Del
                  </button>
                </div>

                <div className="d-flex gap-1">
                  {status !== "To Do" && (
                    <button className="btn btn-outline-primary btn-sm py-0 px-2" onClick={() => moveTask(t.id, "left")}>←</button>
                  )}
                  {status !== "Done" && (
                    <button className="btn btn-outline-primary btn-sm py-0 px-2" onClick={() => moveTask(t.id, "right")}>→</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-5 bg-white p-4 rounded-4 shadow-sm border">
        <div>
           <h2 className="fw-bold text-dark m-0">{project.title}</h2>
           <span className="badge bg-primary-soft text-primary mt-1">Board View</span>
        </div>
        
        <div className="d-flex gap-2">
          <button 
            className="btn btn-success fw-bold px-4 shadow-sm"
            onClick={() => navigate("/add-task", { state: { projectId: project.id } })}
          >
            + Add Task
          </button>
          
          <button className="btn btn-outline-secondary px-3" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>

      <div className="row g-4">
        {statuses.map((status) => (
          <div className="col-lg-4" key={status}>
            <div className="p-3 rounded-4" style={{ backgroundColor: '#f8f9fa', minHeight: '75vh', border: '1px dashed #dee2e6' }}>
              <div className="d-flex align-items-center justify-content-center mb-4">
                <div className={`rounded-circle me-2`} style={{ width: '10px', height: '10px', backgroundColor: 
                  status === "To Do" ? "#ffc107" : status === "In Progress" ? "#0d6efd" : "#198754" 
                }}></div>
                <h5 className="m-0 fw-bold text-secondary uppercase small" style={{ letterSpacing: '1px' }}>{status}</h5>
              </div>
              
              <div className="task-list">
                {renderColumn(status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}