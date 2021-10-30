import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./TodoList";
import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";

type TaskPropsType = {
    todoListID: string
    removeTask: (idTasks: string, todolistID: string) => void
    changeStatusCheckbox: (tasksID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListID: string) => void
    t: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = () => props.removeTask(props.t.id, props.todoListID)
    const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatusCheckbox(props.t.id, e.currentTarget.checked, props.todoListID)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.t.id, newValue, props.todoListID)
    }, [props.t.id, props.changeTaskTitle, props.todoListID])

    return (
        <li key={props.t.id}
            className={`commonClassName ${props.t.isDone ? "is-done" : ""}`}>
            <Checkbox
                // type="checkbox"
                color="success"
                onChange={onChangeHandlerCheckbox}
                checked={props.t.isDone}/>
            <EditableSpan
                title={props.t.title}
                onChange={onChangeTitleHandler}/>
            <IconButton
                style={{marginLeft: "5px"}}
                onClick={onRemoveHandler}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </li>
    );
});