import React, { useState } from "react";

const Home = () => {

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			setTodos([...todos, inputValue]);
			setInputValue("");
		}
	};

	const deleteTodo = (index) => {
		const newTodos = todos.filter((todo, i) => i !== index);
		setTodos(newTodos);
	};

	return (
		<div className="container mt-5">
			<h1 className="text-center">Todo List React</h1>

			<input
				type="text"
				className="form-control mt-3"
				placeholder="Añade una tarea y presiona Enter"
				value={inputValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>

			<ul className="list-group mt-3">
				{todos.length === 0 ? (
					<li className="list-group-item text-center">
						No hay tareas, añadir tareas
					</li>
				) : (
					todos.map((todo, index) => (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between align-items-center todo-item"
						>
							{todo}
							<span
								className="delete-icon"
								onClick={() => deleteTodo(index)}
							>
								🗑️
							</span>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default Home;
