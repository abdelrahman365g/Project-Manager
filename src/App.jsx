import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import ProjectTasks from "./pages/ProjectTasks";
import AddProject from "./pages/AddProject";
import AddTask from "./pages/AddTask";
import Navbar from "./components/Navbar";
import "./index.css";
import "./App.css";

function App() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "HCI Project",
            description: "Project for hci course",
            tasks: [
              {
                id: 1,
                title: "Setup dashboard",
                description: "Create project dashboard",
                status: "In Progress",
              },
            ],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <>
      <Navbar />
      <div className="main-container">
      <Routes>
        <Route
          path="/"
          element={<Dashboard projects={projects} setProjects={setProjects} />}
        />
        <Route
          path="/project/:id"
          element={
            <ProjectTasks projects={projects} setProjects={setProjects} />
          }
        />
        <Route
          path="/add-project"
          element={<AddProject projects={projects} setProjects={setProjects} />}
        />
        <Route
          path="/add-task"
          element={<AddTask projects={projects} setProjects={setProjects} />}
        />
      </Routes>
      </div>
    </>
  );
}

export default App;
