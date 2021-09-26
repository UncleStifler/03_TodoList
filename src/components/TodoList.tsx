import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    todoListTitle: string
    tasks: TaskType[]
    removeTask: (idTasks: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatusCheckbox: (idTasks: string, isDone: boolean) => void
    filter: FilterValuesType
}

const TodoList = (props: TodoListType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        }
    }

    const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13 && newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }

        // ctrlKey: boolean;
        // charCode: number; }) => {
        // if (e.ctrlKey && e.charCode === 13) {
        //     props.addTask(newTaskTitle)
        //     setNewTaskTitle("")
        // }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setNewTaskTitle(e.currentTarget.value)
    }

    return (
        <div>
            <h3>{props.todoListTitle}</h3>
            <div>
                <input
                    autoFocus
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={enterHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={"error-message"}>Title required</div>}
            </div>
            <ul>
                {props.tasks.map(
                    t => {
                        const onRemoveHandler = () => props.removeTask(t.id)
                        const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatusCheckbox(t.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={t.id}
                            className={t.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeHandlerCheckbox}
                                    checked={t.isDone}
                                /> <span>{t.title}</span>
                                <button
                                    style={{marginLeft: "5px"}}
                                    onClick={onRemoveHandler}>x
                                </button>
                            </li>)
                    })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}
                    >
                    Completed
                </button>
            </div>
        </div>
    )
        ;
};

export default TodoList;