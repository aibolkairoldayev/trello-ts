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

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListsType>>(
    [
      { id: todoListId1, title: 'What to learn', filter: 'active' },
      { id: todoListId2, title: 'What to buy', filter: 'completed' }
    ]
  )

  let [tasksObj, setTasks] = useState({
    [todoListId1]: [
      { id: v1(), name: 'HTML', isDone: true },
      { id: v1(), name: 'Java', isDone: true },
      { id: v1(), name: 'React', isDone: false },
      { id: v1(), name: 'Redux', isDone: false }
    ],
    [todoListId2]: [
      { id: v1(), name: 'book', isDone: true },
      { id: v1(), name: 'pencel', isDone: false }
    ]
  })

  function removeTodoList (todoListId: string) {
    let filteredTL=todoLists.filter(tl=>tl.id!==todoListId)
    setTodoLists(filteredTL)
    
    delete tasksObj[todoListId]
    setTasks({...tasksObj})
  }

  function removeTask(id: string, todoListId:string) {
    let tasks = tasksObj[todoListId]
    let filteredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todoListId] = filteredTasks
    setTasks({...tasksObj})
  }

  function addTask(title: string, todoListId: string) {
    let newTask = { id: v1(), name: title, isDone: false }
    let tasks = tasksObj[todoListId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todoListId] = newTasks
    setTasks({...tasksObj})
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasksObj})
    }
    setTasks({...tasksObj})
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
          let tasksForTodolist = tasksObj[tl.id];
          if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
          }

          if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
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
              removeTodoList={removeTodoList}
            />
          )
        })
      }


    </div>
  );
}

export default App;
