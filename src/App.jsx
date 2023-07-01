
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState } from 'react';


export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        text: inputValue,
        time: new Date().toLocaleString(),
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index, newText) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          text: newText,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      {todos.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index}>
              <div className="todo-info">
                <span className="todo-text">{todo.text}</span>
                <span className="todo-time">Added: {todo.time}</span>
              </div>
              <div className="todo-actions">
                <button
                  onClick={() => {
                    const newText = prompt('Enter the new task');
                    if (newText !== null) {
                      handleEditTodo(index, newText);
                    }
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-message">No tasks yet. Add a task above.</p>
      )}
    </div>
  );
}