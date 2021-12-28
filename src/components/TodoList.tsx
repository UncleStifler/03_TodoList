import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import {Delete} from "@mui/icons-material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType} from "./state/todolists-reducer";


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

    const {changeFilter, todoListId,
        removeTodoList, addTask, changeTodoListTitle,
        tasks, filter, todoListTitle, removeTask,
        changeStatusCheckbox, changeTaskTitle} = props

    const onAllClickHandler = useCallback(() => {
        changeFilter("all", todoListId)
    }, [changeFilter, todoListId])
    const onCompletedClickHandler = useCallback(() => {
        changeFilter("completed", todoListId)
    }, [changeFilter, todoListId])
    const onActiveClickHandler = useCallback(() => {
        changeFilter("active", todoListId)
    }, [changeFilter, todoListId])

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    // изначальная ц-ция просит два аргумента, так можно от него избавиться
    const addTaskForAddItem = useCallback((title: string) => {
        addTask(title, todoListId)
    }, [addTask, todoListId])

    const changeTodoListTitleHandler = useCallback((newTodoListTitle: string) => {
        changeTodoListTitle(todoListId, newTodoListTitle)
    }, [changeTodoListTitle, todoListId])

    let tasksForTodolist = props.tasks

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <Link>
                <h3>
                    <EditableSpan
                        title={todoListTitle}
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
                        todoListId={todoListId}
                        removeTask={removeTask}
                        changeStatusCheckbox={changeStatusCheckbox}
                        changeTaskTitle={changeTaskTitle}
                        task={t}
                    />)
                }
            </ul>
            <div>
                <Button
                    variant={filter === "all" ? "outlined" : "text"}
                    onClick={onAllClickHandler}>
                    All
                </Button>
                <Button
                    color={'success'}
                    variant={filter === "active" ? "outlined" : "text"}
                    onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button
                    color={'warning'}
                    variant={filter === "active" ? "outlined" : "text"}
                    onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList




