export default function TaskCard({
  task,
  onDelete,
  onMoveLeft,
  onMoveRight,
  onEdit,
  onDragStart,
}) {

  return (
    <div
      className="card p-3 mb-3"
      draggable
      onDragStart={() => onDragStart(task.id)}
    >
      <h5>{task.title}</h5>
      <p className="text-muted small">{task.description}</p>

      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
          <button className="btn btn-outline-warning btn-sm" onClick={onEdit}>
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>

        <div className="d-flex gap-2">
          {(task.status === "In Progress" || task.status === "Done") && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={onMoveLeft}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          )}
          {(task.status === "In Progress" || task.status === "To Do") && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={onMoveRight}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
