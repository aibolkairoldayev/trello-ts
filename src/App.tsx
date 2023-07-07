import React from 'react';
import './App.css';
import { Todolist } from './Todolist';

function App() {
  let task1 = [
    { id: 1, name: 'HTML', isDone: true },
    { id: 2, name: 'Java', isDone: true },
    { id: 3, name: 'React', isDone: false }
  ]

  let task2 = [
    { id: 1, name: 'Spider man', isDone: true },
    { id: 2, name: 'Batman', isDone: false },
    { id: 3, name: 'Flesh', isDone: true }
  ]

  return (
    <div className="App">
      <Todolist title='What to learn' tasks={task1} />
      <Todolist title='Movies' tasks={task2} />
    </div>
  );
}

export default App;
