import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@mui/icons-material";
import {IconButton, TextField} from "@mui/material";
import {RequestStatusType} from "./app/app-reducer";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setNewTaskTitle(e.currentTarget.value)
    }


    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        }
    }
    const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13 && newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    return (
        <div>
            <TextField
                disabled={props.disabled}
                placeholder='Add new task'
                size="small"
                autoFocus
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={enterHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                disabled={props.disabled}
                color='primary'
                onClick={addTaskHandler}>
                <AddBox/>
            </IconButton>
        </div>
    );
});
