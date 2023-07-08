import React, { ChangeEvent, KeyboardEvent, useState } from "react";
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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addNewTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onAllClickHandler = () => { props.changeFilter(('all')) }
    const onActiveClickHandler = () => { props.changeFilter(('active')) }
    const onCompletedClickHandler = () => { props.changeFilter(('completed')) }

    return (
        <div className="item">
            <h3>{props.title}</h3>
            <div className="newItem">
                <input type="text"
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addNewTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => {
                            { props.removeTask(task.id) }
                        }
                        return (
                            <li key={task.id}><input type="checkbox" checked={task.isDone} />
                                <span>{task.name}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}