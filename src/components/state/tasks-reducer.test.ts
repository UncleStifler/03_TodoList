import {TasksStateType} from "../../App";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import { tasksReducer } from "./tasks-reducer";
import {setTodoListsAC, TodolistDomainType} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
    // const startState: TasksStateType = {
    //     "todolistId1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: true},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistId2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };
    // const action = removeTaskAC("2", "todolistId2");
    // const endState = tasksReducer(startState, action)
    // expect(endState["todolistId2"].length).toBe(2)
    // expect(endState["todolistId1"].length).toBe(3)
    // expect(endState["todolistId2"].every(t => t.id != "2")).toBe(true)
    // expect(endState["todolistId2"].every(t => t.title != "milk")).toBe(true)
});

test('correct task should be added to correct array', () => {
    // const startState: TasksStateType = {
    //     "todolistId1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: true},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistId2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };
    // const action = addTaskAC("juice", "todolistId2")
    // const endState = tasksReducer(startState, action)
    // expect(endState["todolistId1"].length).toBe(3);
    // expect(endState["todolistId2"].length).toBe(4);
    // expect(endState["todolistId2"][0].id).toBeDefined();
    // expect(endState["todolistId2"][0].title).toBe("juice");
    // expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    // const startState: TasksStateType = {
    //     "todolistId1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: true},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistId2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };
    // const action = changeStatusCheckboxAC("2", false, "todolistId2");
    // const endState = tasksReducer(startState, action)
    // expect(endState["todolistId2"][1].isDone).toBeFalsy();
    // expect(endState["todolistId1"][1].isDone).toBeTruthy()
});


test('title of correct task should be changed', () => {
    // const startState: TasksStateType = {
    //     "todolistId1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: true},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistId2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };
    //
    // const action = changeTaskTitleAC("2", "beer", "todolistId2");
    //
    // const endState = tasksReducer(startState, action)
    //
    // expect(endState["todolistId2"][1].title).toBe("beer");
    // // expect(endState["todolistId1"][1].isDone).toBeTruthy()
});


test('new property with array should be added when new todolist is added', () => {
    // const startState: TasksStateType = {
    //     "todolistId1": [
    //         {id: "1", title: "CSS", isDone: false},
    //         {id: "2", title: "JS", isDone: true},
    //         {id: "3", title: "React", isDone: false}
    //     ],
    //     "todolistId2": [
    //         {id: "1", title: "bread", isDone: false},
    //         {id: "2", title: "milk", isDone: true},
    //         {id: "3", title: "tea", isDone: false}
    //     ]
    // };
    //
    //
    // const action = addTodoListAC('Title does not matter')
    // const endState = tasksReducer(startState, action)
    //
    //
    // const keys = Object.keys(endState);
    // console.log(keys)
    // const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    // if (!newKey) {
    //     throw Error("new key should be added")
    // }
    //
    // expect(keys.length).toBe(3);
    // expect(endState[newKey]).toEqual([]);
});

test('tasks should de set', () => {
    const action = setTodoListsAC( [
        {id: '1', title: "What to learn", order: 0, addedDate: ''},
        {id: '2', title: "What to buy", order: 0, addedDate: ''}
    ])
    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
});

