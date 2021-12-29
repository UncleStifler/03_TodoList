import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {RequestStatusType} from "./app/app-reducer";
import {useAppReducer} from "./state/store";
import {TasksStateType} from "./state/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todoListId: string
    removeTask: (idTasks: string, todolistId: string) => void
    changeStatusCheckbox: (tasksID: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
    entityStatus: RequestStatusType
    entityTaskStatus: RequestStatusType


}
export const Task = React.memo((props: TaskPropsType) => {

    // const entityTaskStatus = useAppReducer<TasksStateType>(state => state.tasks)

    const {
        task, todoListId, changeStatusCheckbox, changeTaskTitle, removeTask,
        entityTaskStatus
    } = props

    const onRemoveHandler = useCallback(() => removeTask(task.id, todoListId),
        [task.id, todoListId, removeTask])

    const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeStatusCheckbox(task.id, newIsDoneValue ?
            TaskStatuses.Completed : TaskStatuses.New, todoListId)
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todoListId)
    }, [task.id, changeTaskTitle, todoListId])

    return (
        <li key={task.id}
            className={`commonClassName ${task.status === TaskStatuses.Completed ? "is-done" : ""}`}>
            <Checkbox
                disabled={entityTaskStatus === 'loading'}
                color="success"
                onChange={onChangeHandlerCheckbox}
                checked={task.status === TaskStatuses.Completed}
            />
            <EditableSpan
                disabled={entityTaskStatus === 'loading'}
                title={task.title}
                onChange={onChangeTitleHandler}/>
            <IconButton
                disabled={entityTaskStatus === 'loading'}
                style={{marginLeft: "5px"}}
                onClick={onRemoveHandler}>
                <Delete fontSize={"small"}/>
            </IconButton>
        </li>
    );
});