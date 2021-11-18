
import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodoListAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {TaskType} from "../api/todolists-api";

 // test ('ids should be equals', () => {
    // const startTasksState: TaskType = {};
    // const startTodoListsState: TodolistDomainType[] = [];
    //
    // const action = addTodoListAC("new todolist");
    //
    //
    // const endTasksState = tasksReducer(startTasksState, action)
    // const endTodoListsState = todoListsReducer(startTodoListsState, action)
    //
    // const keys = Object.keys(endTasksState);
    // const idFromTasks = keys[0];
    // const idFromTodoLists = endTodoListsState[0].id;
    //
    // expect(idFromTasks).toBe(action.todolistId);
    // expect(idFromTodoLists).toBe(action.todolistId);

// });


// test('property with todolistId should be deleted', () => {
    // const startState: TaskType = {
    //     // "todolistId1": [
    //     //     { id: "1", title: "CSS", isDone: false },
    //     //     { id: "2", title: "JS", isDone: true },
    //     //     { id: "3", title: "React", isDone: false }
    //     // ],
    //     // "todolistId2": [
    //     //     { id: "1", title: "bread", isDone: false },
    //     //     { id: "2", title: "milk", isDone: true },
    //     //     { id: "3", title: "tea", isDone: false }
    //     // ]
    // };
    //
    // const action = removeTodoListAC("todolistId2");
    // const endState = tasksReducer(startState, action)
    //
    //
    // const keys = Object.keys(endState);
    //
    // expect(keys.length).toBe(1);
    // expect(endState["todolistId2"]).toBeDefined();
// });
