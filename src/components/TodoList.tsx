import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton, Link} from "@material-ui/core";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    todoListID: string
    todoListTitle: string
    tasks: TaskType[]
    removeTask: (idTasks: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeStatusCheckbox: (tasksID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newValue: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTodoListTitle: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void

}

export const TodoList = React.memo(function (props: TodoListType) {
    console.log('TodoList has been called')
    const onAllClickHandler = () => {
        props.changeFilter("all", props.todoListID)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.todoListID)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.todoListID)
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListID)
    }


    // изначальная ц-ция просит два аргумента, так можно от него избавиться
    const addTaskForAddItem = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [])

    const changeTodoListTitleHandler = (newTodoListTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTodoListTitle)
    }

    let tasksForTodolist = props.tasks
    if (props.filter === "completed") {
        tasksForTodolist= props.tasks.filter(t => t.isDone)
    }
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
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
                {tasksForTodolist.map(
                    t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.todoListID)
                        const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatusCheckbox(t.id, e.currentTarget.checked, props.todoListID)
                        }

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.todoListID)
                        }

                        return (
                            <li key={t.id}
                                className={`commonClassName ${t.isDone ? "is-done" : ""}`}>
                                <Checkbox
                                    // type="checkbox"
                                    color="success"
                                    onChange={onChangeHandlerCheckbox}
                                    checked={t.isDone}/>
                                <EditableSpan
                                    title={t.title}
                                    onChange={onChangeTitleHandler}/>
                                <IconButton
                                    style={{marginLeft: "5px"}}
                                    onClick={onRemoveHandler}>
                                    <Delete fontSize={"small"}/>
                                </IconButton>
                            </li>)
                    })}
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
                    // className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList


