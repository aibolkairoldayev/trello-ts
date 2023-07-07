import React from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
    id: number;
    name: string;
    isDone: boolean;
}
type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: number) => void;
    changeFilter: (Value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {


    return (
        <div className="item">
            <h3>{props.title}</h3>
            <div className="newItem">
                <input type="text" />
                <button>+</button>
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