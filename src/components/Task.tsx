import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TaskPropsType = {
    todoListID: string
    removeTask: (idTasks: string, todolistID: string) => void
    changeStatusCheckbox: (tasksID: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListID: string) => void
    t: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = () => props.removeTask(props.t.id, props.todoListID)
    const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatusCheckbox(props.t.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListID)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.t.id, newValue, props.todoListID)
    }, [props.t.id, props.changeTaskTitle, props.todoListID])

    return (
        <li key={props.t.id}
            className={`commonClassName ${props.t.status === TaskStatuses.Completed ? "is-done" : ""}`}>
            <Checkbox
                // type="checkbox"
                color="success"
                onChange={onChangeHandlerCheckbox}
                checked={props.t.status === TaskStatuses.Completed}/>
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