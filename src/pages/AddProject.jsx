import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddProject({ projects, setProjects }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isEdit = location.state?.project;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isEdit) {
      setTitle(isEdit.title);
      setDescription(isEdit.description);
    }
  }, [isEdit]);

  const submit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in both title and description.");
      return;
    }

    if (isEdit) {
      const updatedProjects = projects.map((p) =>
        p.id === isEdit.id ? { ...p, title, description } : p
      );
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    } else {
      const newProject = { id: Date.now(), title, description, tasks: [] };
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    }

    navigate("/");
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fs-4 fw-bold">
          {isEdit ? "Edit Project" : "Add Project"}
        </span>
        <button
          className="btn btn-link text-decoration-none"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left me-1"></i> Back
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

        <button className="btn btn-success shadow  d-block mx-auto">
          <i className="fa-solid fa-plus me-2"></i>
          {isEdit ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
}
