import ProjectCard from "../components/ProjectCard";

export default function Dashboard({ projects, setProjects }) {

  const deleteProject = (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4 bg-white rounded-4 shadow-sm px-4 py-3">
        <h1 className="fw-bold text-primary">
          <i className="fa-solid fa-layer-group me-2"></i> Projects
        </h1>
        <div className="d-flex gap-2">
          <Link className="btn btn-success shadow" to="/add-project">
            <i className="fa-solid fa-plus me-2"></i> Add Project
          </Link>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-muted fs-5 mt-5">
          No projects yet. Start by adding one!
        </p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {projects.map((p) => (
            <div className="col" key={p.id}>
              <ProjectCard project={p} onDelete={deleteProject} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
