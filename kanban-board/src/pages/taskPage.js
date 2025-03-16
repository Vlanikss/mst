import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./taskPage.module.css";

const TaskPage = ({ tasks, onUpdateTask }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = tasks.find(task => String(task.id) === String(taskId));

  const [description, setDescription] = useState(task?.description || "This task has no description");

  useEffect(() => {
    if (task) {
      setDescription(task.description || "This task has no description");
    }
  }, [task]);

  if (!task) {
    return <p className={styles.notFound}>Task not found</p>;
  }

  const handleSave = () => {
    onUpdateTask(taskId, description);
    navigate("/");
  };

  return (
    <div className={styles.taskPage}>
      <h1 className={styles.title}>{task.name}</h1>
      <textarea
        className={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
        <Link className={styles.backLink} to="/">
          X
        </Link>
      </div>
    </div>
  );
};

export default TaskPage;
