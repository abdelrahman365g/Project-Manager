# Project & Task Management App

A web application to manage projects and tasks, built with **React**, **React Router**, and **Bootstrap**. The app allows users to add, edit, delete, and organize projects and tasks with a modern, responsive interface.

---

## Features

- **Dashboard**: Displays all projects in a responsive grid.
- **Add/Edit Project**: Create or update projects with title and description.
- **Add/Edit Task**: Create or update tasks and assign them to a project.
- **Task Status**: Tasks have three statuses:
  - To Do
  - In Progress
  - Done
- **Move Tasks**: Move tasks left or right between statuses.
- **Delete Tasks & Projects**: Remove tasks or entire projects.
- **Persistent Storage**: Data saved in `localStorage`.
- **API Integration**:
  - Tasks loaded from [DummyJSON](https://dummyjson.com/todos).
  - Projects optionally loaded/synced with [MockAPI](https://mockapi.io/).
- **Responsive UI**: Built with Bootstrap 5, including gutters and cards.
- **Icons**: Uses Font Awesome for action icons (view, edit, delete, arrows).

---

## How to Run

1. **Clone the repository**:
   ```
   git clone https://github.com/abdelrahman365g/Project-Manager/
   cd Project-Manager
2. **Install the dependencies** :
   ```
   npm install
3. **Run it**:
   ```
   npm run dev
