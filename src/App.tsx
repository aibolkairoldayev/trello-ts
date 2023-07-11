import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListsType>>(
    [
      { id: todoListId1, title: 'What to learn', filter: 'all' },
      { id: todoListId2, title: 'What to buy', filter: 'all' }
    ]
  )
  
  type todoObjType = {
    [key:string]:Array<TaskType>
  }

  let [tasksObj, setTasks] = useState<todoObjType>({
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

  function changeTodoListTitle (todoListId: string, newTitle:string) {
    let todoList=todoLists.find(tl=>tl.id===todoListId)
    if(todoList) {
      todoList.title = newTitle
      setTodoLists([...todoLists])
    }
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

  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    let tasks = tasksObj[todoListId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.name = newTitle
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

  function addTodoList (title:string) {
    let todoList:TodoListsType = {
      id: v1(),
      filter: 'all',
      title: title
    } 
    setTodoLists([todoList, ...todoLists])
    setTasks({
      ...tasksObj,
      [todoList.id]:[]
    })
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList}/>
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
              changeTaskTitle={changeTaskTitle}
              filter={tl.filter}
              removeTodoList={removeTodoList}
              changeTodoListTitle={changeTodoListTitle}
            />
          )
        })
      }
    </div>
  );
}

export default App;
