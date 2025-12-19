import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import ProjectTasks from "./pages/ProjectTasks";
import AddProject from "./pages/AddProject";
import AddTask from "./pages/AddTask";
import Navbar from "./components/Navbar";
import "./index.css";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

useEffect(() => {
  const saved = localStorage.getItem("projects");
  if (saved) {
    setProjects(JSON.parse(saved));
  } else {
    fetch("https://6945cdaeed253f51719c591b.mockapi.io/projects/project")
      .then((res) => res.json())
      .then((apiProjects) => {
        fetch("https://dummyjson.com/todos?limit=9")
          .then((res) => res.json())
          .then((taskData) => {
            const tasks = taskData.todos.map((t) => ({
              id: t.id,
              title: t.todo,
              description: "Imported task",
              status: t.completed ? "Done" : "To Do",
            }));

            const mappedProjects = apiProjects.map((p) => ({
              id: Number(p.id),
              title: p.title,
              description: p.description,
              tasks: tasks,
            }));

            setProjects(mappedProjects);
            localStorage.setItem("projects", JSON.stringify(mappedProjects));
          })
          .catch(() => console.log("Failed to load tasks from dummy API"));
      })
      .catch(() => console.log("Failed to load projects from MockAPI"));
  }
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
