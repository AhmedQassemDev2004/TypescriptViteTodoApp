import './scss/style.scss'
import TaskList from "./models/TaskList.ts";
import ListTemplate from "./templates/ListTemplate.ts";
import ListItem from "./models/ListItem.ts";

function initApp() {
    const taskList = TaskList.instance;
    const template = ListTemplate.instance;

    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement;
    itemEntryForm.addEventListener('submit',e=>{
        e.preventDefault();
        const input = document.getElementById("newItem") as HTMLInputElement
        const text: string = input.value.trim()
        if (!text.length) return

        const itemId: number = taskList.list.length
            ? parseInt(taskList.list[taskList.list.length - 1].id) + 1
            : 1

        const newItem = new ListItem(itemId.toString(), text)
        taskList.addItem(newItem)
        template.render(taskList)

        input.value = '';
    });

    const clearItems = document.getElementById("clearItems") as HTMLButtonElement;
    clearItems.addEventListener('click',()=>{
        taskList.clearList();
        template.clear();
    });

    taskList.load();
    template.render(taskList);

}

document.addEventListener("DOMContentLoaded",initApp)