import {AddItemForm} from "./AddItemForm";

export default {
    title: "AddItemForm Component",
    component: AddItemForm,
}

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={(title) => {
        alert(title)
    }}/>
}