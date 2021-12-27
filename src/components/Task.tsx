import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TaskPropsType = {
    task: TaskType
    todoListId: string
    removeTask: (idTasks: string, todolistId: string) => void
    changeStatusCheckbox: (tasksID: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = useCallback(() => props.removeTask(props.task.id, props.todoListId),
        [props.task.id, props.todoListId])

    const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatusCheckbox(props.task.id, newIsDoneValue ?
            TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId)
    }, [props.task.id, props.changeTaskTitle, props.todoListId])

    return (
        <li key={props.task.id}
            className={`commonClassName ${props.task.status === TaskStatuses.Completed ? "is-done" : ""}`}>
            <Checkbox
                // type="checkbox"
                color="success"
                onChange={onChangeHandlerCheckbox}
                checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan
                title={props.task.title}
                onChange={onChangeTitleHandler}/>
            <IconButton
                style={{marginLeft: "5px"}}
                onClick={onRemoveHandler}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </li>
    );
});