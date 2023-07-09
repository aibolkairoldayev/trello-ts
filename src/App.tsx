import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>(
    [
      { id: v1(), name: 'HTML', isDone: true },
      { id: v1(), name: 'Java', isDone: true },
      { id: v1(), name: 'React', isDone: false },
      { id: v1(), name: 'Redux', isDone: false }
    ]
  )
  let [todoLists, setTodoLists] = useState<Array<TodoListsType>>(
    [
      { id: v1(), title: 'What to learn', filter: 'active' },
      { id: v1(), title: 'What to buy', filter: 'completed' }
    ]
  )

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks)
  }

  function addTask(title: string) {
    let newTask = { id: v1(), name: title, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeTaskStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }




  return (
    <div className="App">
      {
        todoLists.map(tl => {
          let tasksForTodolist = tasks;
          if (tl.filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.isDone === true)
          }

          if (tl.filter === "active") {
            tasksForTodolist = tasks.filter(t => t.isDone === false)
          }
          return (
            <Todolist
              id={tl.id}
              key={tl.id}
              title={tl.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              filter={tl.filter}
            />
          )
        }

        )
      }


    </div>
  );
}

export default App;
