import { IconButton, TextField } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addNewTask();
        }
    };
    const addNewTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        }
        else {
            setError('Required field');
        }
    };
    return (
        <div className="newItem">
            <TextField type="text"
                label={'Type Value'}
                variant={"outlined"}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error}
                error={!!error} />
                
            <IconButton 
                onClick={addNewTask}
                color="primary"
            >
                <ControlPoint/>
            </IconButton>
        </div>
    );
}
