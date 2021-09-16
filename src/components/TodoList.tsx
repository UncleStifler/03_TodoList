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
}

const TodoList = (props: TodoListType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const addTaskHandler = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }

    const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
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
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(
                    t => {
                        const onRemoveHandler = () => props.removeTask(t.id)
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                                <button
                                    style={{marginLeft: "5px"}}
                                    onClick={onRemoveHandler}>x
                                </button>
                            </li>)
                    })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onCompletedClickHandler}>Active</button>
                <button onClick={onActiveClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;