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
    const saved = localStorage.getItem("projects");
    if (saved) return;

    fetch("https://dummyjson.com/todos?limit=9")
      .then((res) => res.json())
      .then((data) => {
        const apiProjects = [
          {
            id: 100,
            title: "API Project",
            description: "Loaded from DummyJSON API",
            tasks: data.todos.map((t) => ({
              id: t.id,
              title: t.todo,
              description: "Imported task",
              status: t.completed ? "Done" : "To Do",
            })),
          },
        ];

        setProjects(apiProjects);
        localStorage.setItem("projects", JSON.stringify(apiProjects));
      })
      .catch(() => {
        console.log("API failed, using local data");
      });
  }, []);

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
          path="/add-project/:id"
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
