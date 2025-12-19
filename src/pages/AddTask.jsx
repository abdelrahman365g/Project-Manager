import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddTask({ projects, setProjects }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isEdit = location.state?.task;
  const editProjectId = location.state?.projectId;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [status, setStatus] = useState("To Do");

  useEffect(() => {
    if (isEdit) {
      setTitle(isEdit.title);
      setDescription(isEdit.description);
      setProjectId(editProjectId);
      setStatus(isEdit.status);
    }
  }, [isEdit, editProjectId]);

  const submit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in both title and description.");
      return;
    }

    const updatedProjects = projects.map((p) => {
      if (p.id === Number(projectId)) {
        if (isEdit) {
          return {
            ...p,
            tasks: p.tasks.map((t) =>
              t.id === isEdit.id ? { ...t, title, description, status } : t
            ),
          };
        } else {
          return {
            ...p,
            tasks: [...p.tasks, { id: Date.now(), title, description, status }],
          };
        }
      }
      return p;
    });

    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    navigate(`/project/${projectId}`);
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fs-4 fw-bold">{isEdit ? "Edit Task" : "Add Task"}</span>
        <button
          className="btn btn-link text-decoration-none"
          onClick={() => navigate(-1)}
          type="button"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={submit}>
        <input
          className="form-control w-50 my-3 mx-auto"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="form-control w-50 my-3 mx-auto"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="form-select w-50 my-3 mx-auto"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>

        <select
          className="form-select w-50 my-3 mx-auto"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <button className="btn btn-success mt-4 mx-auto d-block">
          {isEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}
