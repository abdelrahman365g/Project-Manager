import { useParams, Link, useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import { useState } from "react";

export default function ProjectTasks({ projects, setProjects }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === Number(id));
  const statuses = ["To Do", "In Progress", "Done"];
  const [search, setSearch] = useState("");
  const [draggedTaskId, setDraggedTaskId] = useState(null);

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
  const handleDrop = (newStatus) => {
    if (!draggedTaskId) return;

    const updatedProjects = projects.map((p) =>
      p.id === project.id
        ? {
            ...p,
            tasks: p.tasks.map((t) =>
              t.id === draggedTaskId ? { ...t, status: newStatus } : t
            ),
          }
        : p
    );

    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setDraggedTaskId(null);
  };

  const renderColumn = (status) => (
    <div className="d-flex flex-column gap-3">
      {project.tasks
        .filter(
          (t) => t.status === status && t.title.toLowerCase().includes(search)
        )
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
            onDragStart={setDraggedTaskId}
          />
        ))}
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 shadow-sm rounded-4 bg-white">
        <h2 className="fw-bold mb-0">
          <i className="fa-solid fa-layer-group me-2 text-primary"></i>
          {project.title}
        </h2>
        <input
          className="form-control w-50"
          placeholder="Search by name..."
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <div className="d-flex justify-content-between align-items-center gap-3">
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

      <div className="row g-4">
        {statuses.map((status) => (
          <div
            className="col-lg-4"
            key={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(status)}
          >
            <div
              className="p-3 rounded-4"
              style={{
                backgroundColor: "#f8f9fa",
                minHeight: "75vh",
                border: "1px dashed #dee2e6",
              }}
            >
              <div className="d-flex align-items-center justify-content-center mb-4">
                <div
                  className={`rounded-circle me-2`}
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor:
                      status === "To Do"
                        ? "#ffc107"
                        : status === "In Progress"
                        ? "#0d6efd"
                        : "#198754",
                  }}
                ></div>
                <h5
                  className="m-0 fw-bold text-secondary uppercase"
                  style={{ letterSpacing: "1px" }}
                >
                  {status}
                </h5>
              </div>

              <div className="task-list">{renderColumn(status)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
