import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddTask({ projects, setProjects }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const editingTask = state?.task;
  const targetProjectId = state?.projectId;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: targetProjectId || projects[0]?.id || "",
    status: "To Do",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        projectId: targetProjectId,
        status: editingTask.status,
      });
    }
  }, [editingTask, targetProjectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, projectId, status } = formData;

    if (!title.trim() || !description.trim()) {
      alert("Please fill in both title and description.");
      return;
    }

    const updatedProjects = projects.map((project) => {
      if (project.id === Number(projectId)) {
        const updatedTasks = editingTask
          ? project.tasks.map((t) => (t.id === editingTask.id ? { ...t, title, description, status } : t))
          : [...project.tasks, { id: Date.now(), title, description, status }];

        return { ...project, tasks: updatedTasks };
      }
      return project;
    });

    saveData(updatedProjects, projectId);
  };

  const saveData = (updatedData, currentProjectId) => {
    setProjects(updatedData);
    localStorage.setItem("projects", JSON.stringify(updatedData));
    navigate(`/project/${currentProjectId}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <header className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 fw-bold text-primary m-0">
                {editingTask ? "Edit Task" : "New Task"}
              </h2>
              <button className="btn btn-link text-muted p-0" onClick={() => navigate(-1)}>
                Cancel
              </button>
            </header>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">PROJECT</label>
                <select
                  name="projectId"
                  className="form-select border-2 shadow-none"
                  value={formData.projectId}
                  onChange={handleChange}
                  disabled={!!editingTask}
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">TASK TITLE</label>
                <input
                  name="title"
                  className="form-control border-2 shadow-none"
                  placeholder="What needs to be done?"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">STATUS</label>
                <select
                  name="status"
                  className="form-select border-2 shadow-none"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">DESCRIPTION</label>
                <textarea
                  name="description"
                  className="form-control border-2 shadow-none"
                  rows="3"
                  placeholder="Add some details..."
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="d-grid">
                <button 
                  type="submit"
                  className={`btn btn-lg fw-bold ${editingTask ? "btn-warning text-white" : "btn-success"}`}
                >
                  {editingTask ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}