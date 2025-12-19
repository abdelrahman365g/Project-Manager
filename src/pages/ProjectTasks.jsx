import { useParams, Link, useNavigate } from "react-router-dom";

export default function ProjectTasks({ projects, setProjects }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === Number(id));
  const statuses = ["To Do", "In Progress", "Done"];

  if (!project) return <p>Project not found</p>;

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
    const updatedProjects = projects.map((p) =>
      p.id === project.id
        ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
        : p
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const renderColumn = (status) => (
    <div className="row row-cols-1">
      {project.tasks
        .filter((t) => t.status === status)
        .map((t) => (
          <div className="card p-3 shadow-sm mb-3" key={t.id}>
            <h4>{t.title}</h4>
            <p>{t.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(t.id)}
              >
                Delete
              </button>

              <button
                className="btn btn-warning btn-sm"
                onClick={() =>
                  navigate("/add-task", { state: { task: t, projectId: project.id } })
                }
              >
                Edit
              </button>

              <div className="d-flex gap-1">
                {status !== "To Do" && (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => moveTask(t.id, "left")}
                  >
                    ←
                  </button>
                )}
                {status !== "Done" && (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => moveTask(t.id, "right")}
                  >
                    →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fs-4 fw-bold">{project.title}</span>
        <button className="btn btn-link text-decoration-none" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className="d-flex justify-content-between">
        {statuses.map((status) => (
          <div style={{ width: "30%" }} key={status}>
            <h3
              className={`text-center my-3 ${
                status === "To Do"
                  ? "text-warning"
                  : status === "In Progress"
                  ? "text-primary"
                  : "text-success"
              }`}
            >
              {status}
            </h3>
            {renderColumn(status)}
          </div>
        ))}
      </div>
    </div>
  );
}
