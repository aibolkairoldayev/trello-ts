import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>(
    [
      { id: 1, name: 'HTML', isDone: true },
      { id: 2, name: 'Java', isDone: true },
      { id: 3, name: 'React', isDone: false },
      { id: 4, name: 'Redux', isDone: false }
    ]
  )

  let [filter, setFilter] = useState<FilterValuesType>('all')

  function removeTask(id: number) {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true)
  }

  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <Todolist title='What to learn' tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter} />
    </div>
  );
}

export default App;
