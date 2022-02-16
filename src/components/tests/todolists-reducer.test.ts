import {v1} from "uuid";
import {
    addTodoListAC,
    changeTodoListFilterActionType,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, setTodoListsAC, TodolistDomainType,
    todoListsReducer
} from "../state/todolists-reducer";
import {TodolistType} from "../api/todolists-api";


test('correct todolist should be removed', () => {
    // let todoListId1 = v1();
    // let todoListId2 = v1();
    //
    // const startState: ToDoListType[] = [
    //     {id: todoListId1, todoListTitle: "What to learn", filter: "all"},
    //     {id: todoListId2, todoListTitle: "What to buy", filter: "all"}
    // ]
    //
    // // const endState = todoListsReducer(startState, {
    // //     type: 'REMOVE-TODOLIST',
    // //     id: todoListId1
    // // })
    // const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))
    //
    // expect(endState.length).toBe(startState.length - 1);
    // expect(endState[0].id).toBe(todoListId2);
});
test('todolist should be added', () => {
    // let todoListId1 = v1();
    // let todoListId2 = v1();
    //
    // let newTitleTodoList = 'New TodoList'
    //
    // const startState: TodolistDomainType[] = [
    //     {id: todoListId1, title: "What to learn", filter: "all"},
    //     {id: todoListId2, title: "What to buy", filter: "all"}
    // ]
    //
    // const endState = todoListsReducer(startState, addTodoListAC(newTitleTodoList))
    //
    // expect(endState.length).toBe(startState.length + 1)
    // expect(endState[2].title).toBe(newTitleTodoList)
    // expect(endState[2].filter).toBe("all")
})
test('correct todoList should change its name', () => {
    // let todoListId1 = v1();
    // let todoListId2 = v1();
    //
    // let newTitleTodoList = 'New TodoList'
    //
    // const startState: ToDoListType[] = [
    //     {id: todoListId1, todoListTitle: "What to learn", filter: "all"},
    //     {id: todoListId2, todoListTitle: "What to buy", filter: "all"}
    // ]
    //
    // const action = changeTodoListTitleAC(todoListId2, newTitleTodoList)
    //
    // const endState = todoListsReducer(startState, action)
    //
    // expect(endState[0].title).toBe("What to learn")
    // expect(endState[1].title).toBe(newTitleTodoList)
})
test('correct filter of todoList should be changed', () => {
    // let todoListId1 = v1();
    // let todoListId2 = v1();
    //
    // let newFilter: FilterValuesType = 'completed'
    //
    // const startState: ToDoListType[] = [
    //     {id: todoListId1, todoListTitle: "What to learn", filter: "all"},
    //     {id: todoListId2, todoListTitle: "What to buy", filter: "all"}
    // ]
    //
    // const action = changeTodoListFilterAC(newFilter, todoListId2)
    //
    //
    // const endState = todoListsReducer(startState, action)
    //
    // expect(endState[0].filter).toBe("all")
    // expect(endState[1].filter).toBe(newFilter)
})
test('todolist should be set', () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: TodolistDomainType[] = [
        // {id: todoListId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        // {id: todoListId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
    const action = setTodoListsAC(startState)
    const endState = todoListsReducer([], action)
    expect(endState.length).toBe(2)
})
