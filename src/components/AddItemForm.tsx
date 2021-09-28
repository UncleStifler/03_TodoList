import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormPropsType = {
    addItem: (title: string, todolistID: string) => void
    todoListID: string
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim(), props.todoListID)
            setNewTaskTitle("")
        }
    }

    const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13 && newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle, props.todoListID)
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    return (
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
    );
};
