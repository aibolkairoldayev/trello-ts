import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: string;
    name: string;
    isDone: boolean;
}
type PropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskid: string, isDone: boolean) => void
    filter: FilterValuesType
}



export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addNewTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        }
        else {
            setError('Required field')
        }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    return (
        <div className="item">
            <h3>{props.title}</h3>
            <div className="newItem">
                <input type="text"
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addNewTask}>+</button>
                {error && <div className="error__message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => {
                            { props.removeTask(task.id) }
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked)
                        }
                        return (
                            <li
                                key={task.id}
                                className={task.isDone ? 'done' : ''}
                            >
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                <span>{task.name}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button
                    onClick={onAllClickHandler}
                    className={props.filter === 'all' ? "active__filter" : ''}
                >All</button>
                <button
                    onClick={onActiveClickHandler}
                    className={props.filter === 'active' ? "active__filter" : ''}
                >Active</button>
                <button
                    onClick={onCompletedClickHandler}
                    className={props.filter === 'completed' ? "active__filter" : ''}
                >Completed</button>
            </div>
        </div>
    )
}