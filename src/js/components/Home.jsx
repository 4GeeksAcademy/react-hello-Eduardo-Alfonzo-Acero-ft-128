import { useEffect, useState } from "react";

const USERS_URL = "https://playground.4geeks.com/todo/users";
const TODOS_URL = "https://playground.4geeks.com/todo/todos";
const USERNAME = "edu123";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  
  const createUser = async () => {
    await fetch(`${USERS_URL}/${USERNAME}`, {
      method: "POST",
    });
  };

  
  const getTasks = async () => {
    const resp = await fetch(`${USERS_URL}/${USERNAME}`);

    if (!resp.ok) {
      await createUser();
      return;
    }

    const data = await resp.json();
    setTasks(data.todos);
  };

  
  const addTask = async () => {
    if (newTask.trim() === "") return;

    await fetch(`${TODOS_URL}/${USERNAME}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: newTask,
        is_done: false,
      }),
    });

    setNewTask("");
    await getTasks();
  };

  
  const deleteTask = async (id) => {
    await fetch(`${TODOS_URL}/${id}`, {
      method: "DELETE",
    });

    await getTasks();
  };

 
  const clearAllTasks = async () => {
    await fetch(`${USERS_URL}/${USERNAME}`, {
      method: "DELETE",
    });

    await createUser();
    await getTasks();
  };

 
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
      <h1 className="text-center mb-4">TODO List</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Añadir tarea y presiona Enter"
        style={{ width: "100%", padding: "10px" }}
      />

      <ul className="listas p-0 mt-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task.id}
              className="d-flex justify-content-between align-items-center border-bottom p-2"
            >
              {task.label}

             
              <span
                onClick={() => deleteTask(task.id)}
                style={{
                  color: "red",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                ✖
              </span>
            </li>
          ))
        ) : (
          <p className="text-center mt-3">
            No hay tareas, añade una 🙂
          </p>
        )}
      </ul>

      <button
        onClick={clearAllTasks}
        className="btn btn-danger mt-3 w-100"
      >
        Limpiar todas las tareas
      </button>
    </div>
  );
};

export default Home;
