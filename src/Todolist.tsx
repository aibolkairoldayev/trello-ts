import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { IconButton } from "@mui/material";
import { Button, Checkbox } from "@mui/material";
import { Delete } from "@mui/icons-material";

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
    changeTodoListTitle: (todoListId:string, newTitle:string)=> void
    changeTaskTitle: (taskid: string, newTitle: string, todoListId:string)=>void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (newTitle:string) => props.changeTodoListTitle(props.id, newTitle)
    
    const addTask = (title: string)=> {
        props.addTask(title, props.id)
    }
    
    return (
        <div className="item">
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>                
            </h3>
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
                        const onChangeTitleHandler = (newTitle:string) => {
                            props.changeTaskTitle(task.id, newTitle, props.id)
                        }
                        return (
                            <li
                                key={task.id}
                                className={task.isDone ? 'done' : ''}
                            >
                                <Checkbox
                                    checked={task.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                <EditableSpan title={task.name} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    variant={props.filter === 'all' ? "contained" : 'text'}
                >All
                </Button>
                <Button
                    color={"success"}
                    onClick={onActiveClickHandler}
                    variant={props.filter === 'active' ? "contained" : 'text'}
                >Active
                </Button>
                <Button
                    color="secondary"
                    onClick={onCompletedClickHandler}
                    variant={props.filter === 'completed' ? "contained" : 'text'}
                >Completed</Button>
            </div>
        </div>
    )
}
