import React, { useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: string;
    name: string;
    isDone: boolean;
}
type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    changeFilter: (Value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    return (
        <div className="item">
            <h3>{props.title}</h3>
            <div className="newItem">
                <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.currentTarget.value)} />
                <button onClick={() => {
                    props.addTask(newTaskTitle)
                    setNewTaskTitle('')
                }}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        return (
                            <li key={task.id}><input type="checkbox" checked={task.isDone} />
                                <span>{task.name}</span>
                                <button onClick={() => { props.removeTask(task.id) }}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={() => { props.changeFilter(('all')) }}>All</button>
                <button onClick={() => { props.changeFilter(('active')) }}>Active</button>
                <button onClick={() => { props.changeFilter(('completed')) }}>Completed</button>
            </div>
        </div>
    )
}