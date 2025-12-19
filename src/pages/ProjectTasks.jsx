import { useParams, Link, useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";

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
    const updatedProjects = projects.map((p) =>
      p.id === project.id
        ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
        : p
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const renderColumn = (status) => (
    <div className="d-flex flex-column gap-3">
      {project.tasks
        .filter((t) => t.status === status)
        .map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            projectId={project.id}
            onDelete={() => deleteTask(t.id)}
            onMoveLeft={() => moveTask(t.id, "left")}
            onMoveRight={() => moveTask(t.id, "right")}
            onEdit={() =>
              navigate("/add-task", {
                state: { task: t, projectId: project.id },
              })
            }
          />
        ))}
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 shadow-sm rounded bg-white">
        <h2 className="fw-bold mb-0">
          <i className="fa-solid fa-layer-group me-2 text-primary"></i>
          {project.title}
        </h2>
        <div className="d-flex justify-content-between align-items-center mb-4 gap-3">
          <Link
            className="btn btn-primary shadow"
            to="/add-task"
            state={{ projectId: project.id }}
          >
            <i className="fa-solid fa-tasks me-2"></i> Add Task
          </Link>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left me-1"></i> Back
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        {statuses.map((status) => (
          <div style={{ width: "30%" }} key={status}>
            <h4
              className={`text-center p-2 rounded-top ${
                status === "To Do"
                  ? "bg-warning text-dark"
                  : status === "In Progress"
                  ? "bg-primary text-white"
                  : "bg-success text-white"
              }`}
            >
              {status}
            </h4>
            <div className="p-2 bg-light rounded-bottom min-vh-50 shadow-sm">
              {renderColumn(status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
