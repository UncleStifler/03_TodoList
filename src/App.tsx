import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid"

export type FilterValuesType = "all" | "completed" | "active"

function App() {


    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "TypeScript", isDone: false},
        {id: v1(), title: "REACT", isDone: true},
        {id: v1(), title: "REDUX", isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")


    // let tasks2 = [
    //     {id: v1(), title: "Terminator", isDone: true},
    //     {id: v1(), title: "XXX", isDone: true},
    //     {id: v1(), title: "Jentelmens of fortune", isDone: false},
    // ]\

    const addTask = (title: string) => {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }


    const removeTask = (idTasks: string) => {
        setTasks(tasks.filter(t => t.id !== idTasks))
    }

    let tasksForTodolist = tasks
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function changeStatusCheckbox(idTasks: string, isDone: boolean) {
        let task = tasks.find(t => t.id === idTasks)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }


    return (
        <div className="App">
            <TodoList
                todoListTitle="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatusCheckbox={changeStatusCheckbox}
            />
        </div>
    );
}

export default App;
