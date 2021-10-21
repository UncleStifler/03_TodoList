import {v1} from "uuid";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./todolists-reducer";
import {FilterValuesType, ToDoListType} from "../../App";

test('correct todolist should be removed', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    const startState: ToDoListType[] = [
        {id: todoListID1, todoListTitle: "What to learn", filter: "all"},
        {id: todoListID2, todoListTitle: "What to buy", filter: "all"}
    ]

    // const endState = todoListsReducer(startState, {
    //     type: 'REMOVE-TODOLIST',
    //     id: todoListID1
    // })
    const endState = todoListsReducer(startState, removeTodoListAC(todoListID1))

    expect(endState.length).toBe(startState.length - 1);
    expect(endState[0].id).toBe(todoListID2);
});


test('todolist should be added', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    let newTitleTodoList = 'New TodoList'

    const startState: ToDoListType[] = [
        {id: todoListID1, todoListTitle: "What to learn", filter: "all"},
        {id: todoListID2, todoListTitle: "What to buy", filter: "all"}
    ]

    const endState = todoListsReducer(startState, addTodoListAC(newTitleTodoList))

    expect(endState.length).toBe(startState.length + 1)
    expect(endState[2].todoListTitle).toBe(newTitleTodoList)
    expect(endState[2].filter).toBe("all")
})

test('correct todoList should change its name', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    let newTitleTodoList = 'New TodoList'

    const startState: ToDoListType[] = [
        {id: todoListID1, todoListTitle: "What to learn", filter: "all"},
        {id: todoListID2, todoListTitle: "What to buy", filter: "all"}
    ]

    const action = changeTodoListTitleAC(todoListID2, newTitleTodoList)

    const endState = todoListsReducer(startState, action)

    expect(endState[0].todoListTitle).toBe("What to learn")
    expect(endState[1].todoListTitle).toBe(newTitleTodoList)
})

test('correct filter of todoList should be changed', () => {
    let todoListID1 = v1();
    let todoListID2 = v1();

    let newFilter: FilterValuesType = 'completed'

    const startState: ToDoListType[] = [
        {id: todoListID1, todoListTitle: "What to learn", filter: "all"},
        {id: todoListID2, todoListTitle: "What to buy", filter: "all"}
    ]

    const action = changeTodoListFilterAC(newFilter, todoListID2)


    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})