





    useEffect(() => {
        todoListsAPI.deleteTodoList("e0cfaf80-83c3-4196-bc47-58298b5bfa09")
            .then(response => {
                console.log(response.data)
            })
    }, [])


    useEffect(() => {
        todoListsAPI.updateTodoList("d119687c-1af6-4a6b-baed-970906b138ce", "ЗА НАС")
            .then(response => {
                console.log(response.data)
            })
    }, [])
