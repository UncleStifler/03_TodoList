import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";


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
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
}

export const TodoList=(props: TodoListType) => {

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

    const addTaskForAddItem = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    return (
        <div>
            <h3>{props.todoListTitle}
                <button onClick={removeTodoListHandler}>x</button>
            </h3>
            <AddItemForm
                addItem={addTaskForAddItem}/>
            <ul>
                {props.tasks.map(
                    t => {
                        const onRemoveHandler = () => props.removeTask(t.id, props.todoListID)
                        const onChangeHandlerCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatusCheckbox(t.id, e.currentTarget.checked, props.todoListID)
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

export default TodoList



