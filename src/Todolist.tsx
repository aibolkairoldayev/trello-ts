import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
    id: string;
    name: string;
    isDone: boolean;
}
type PropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todoListId:string) => void;
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId:string) => void
    changeTaskStatus: (taskid: string, isDone: boolean, todoListId:string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId:string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => props.removeTodoList(props.id)
    
    const addTask = (title: string)=> {
        props.addTask(title, props.id)
    }

    return (
        <div className="item">
            <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => {
                            { props.removeTask(task.id, props.id) }
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
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
