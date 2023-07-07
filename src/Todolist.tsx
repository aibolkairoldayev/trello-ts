import React from "react";

type TaskType = {
    id: number;
    name: string;
    isDone: boolean;
}
type PropsType = {
    title: string;
    tasks: Array<TaskType>
}

export function Todolist(props: PropsType) {


    return (
        <div className="item">
            <h3>{props.title}</h3>
            <div>
                <input type="text" />
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone} /><span>{props.tasks[0].name}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone} /><span>{props.tasks[1].name}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone} /><span>{props.tasks[2].name}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}