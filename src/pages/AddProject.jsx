import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddProject({ projects, setProjects }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const editingProject = state?.project;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        description: editingProject.description,
      });
    }
  }, [editingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = formData;

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedProjects = editingProject
      ? projects.map((p) => (p.id === editingProject.id ? { ...p, title, description } : p))
      : [...projects, { id: Date.now(), title, description, tasks: [] }];

    saveData(updatedProjects);
  };

  const saveData = (data) => {
    setProjects(data);
    localStorage.setItem("projects", JSON.stringify(data));
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <header className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 fw-bold text-primary m-0">
                {editingProject ? "Edit Project" : "New Project"}
              </h2>
              <button className="btn btn-link text-muted p-0" onClick={() => navigate(-1)}>
                Cancel
              </button>
            </header>

            <form onSubmit={handleSubmit}>
              <FormField
                label="PROJECT TITLE"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Website Redesign"
              />

              <FormField
                label="DESCRIPTION"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What is this project about?"
                isTextArea
              />

              <div className="d-grid mt-4">
                <button 
                  className={`btn btn-lg fw-bold ${editingProject ? "btn-warning text-white" : "btn-primary"}`}
                  type="submit"
                >
                  {editingProject ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, name, value, onChange, placeholder, isTextArea = false }) {
  const InputTag = isTextArea ? "textarea" : "input";
  return (
    <div className="mb-3">
      <label className="form-label small fw-bold text-secondary">{label}</label>
      <InputTag
        name={name}
        className="form-control border-2 shadow-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={isTextArea ? "4" : undefined}
      />
    </div>
  );
}