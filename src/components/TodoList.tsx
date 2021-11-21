import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import {Delete} from "@mui/icons-material";
import {Button, IconButton, Link} from "@mui/material";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./state/todolists-reducer";
import {loadTasksTC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";


export type TodoListType = {
    todoListId: string
    todoListTitle: string
    tasks: TaskType[]
    removeTask: (idTasks: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatusCheckbox: (tasksID: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTodoListTitle: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void

}

export const TodoList = React.memo(function (props: TodoListType) {

    let dispatch = useDispatch()

    // useEffect( () => {
    //     dispatch(loadTasksTC(props.todoListId))
    // },[props.tasks])


    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.todoListId)
    }, [props.changeFilter, props.todoListId])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.todoListId)
    }, [props.changeFilter, props.todoListId])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.todoListId)
    }, [props.changeFilter, props.todoListId])

    const removeTodoListHandler = () => {

        props.removeTodoList(props.todoListId)
    }

    // изначальная ц-ция просит два аргумента, так можно от него избавиться
    const addTaskForAddItem = useCallback((title: string) => {
        console.log(props.todoListId,'Todolist');
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const changeTodoListTitleHandler = useCallback((newTodoListTitle: string) => {
        props.changeTodoListTitle(props.todoListId, newTodoListTitle)
    }, [props.changeTodoListTitle, props.todoListId])

    let tasksForTodolist = props.tasks

    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <Link>
                <h3>
                    <EditableSpan
                        title={props.todoListTitle}
                        onChange={changeTodoListTitleHandler}/>
                    <IconButton
                        onClick={removeTodoListHandler}>
                        <Delete/>
                    </IconButton>
                </h3>
            </Link>
            <AddItemForm
                addItem={addTaskForAddItem}/>
            <ul>
                {
                    tasksForTodolist && tasksForTodolist.map(t => <Task
                        key={t.id}
                        todoListId={props.todoListId}
                        removeTask={props.removeTask}
                        changeStatusCheckbox={props.changeStatusCheckbox}
                        changeTaskTitle={props.changeTaskTitle}
                        task={t}
                    />)
                }
            </ul>
            <div>
                <Button
                    variant={props.filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}>
                    All
                </Button>
                <Button
                    color={'success'}
                    variant={props.filter === "active" ? "outlined" : "text"}
                    // className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button
                    color={'warning'}
                    variant={props.filter === "active" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList




