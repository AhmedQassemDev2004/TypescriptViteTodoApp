import TaskList from "../models/TaskList.ts";

export interface DOMList {
    ul:HTMLUListElement,
    clear():void,
    render(taskList:TaskList):void
}


export default class ListTemplate implements DOMList {
    ul:HTMLUListElement
    static instance:ListTemplate = new ListTemplate();

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear() {
        this.ul.innerHTML = '';
    }

    render(taskList: TaskList) {
        this.clear()
        taskList.list.forEach(item => {
            const li = document.createElement('li');
            li.className = 'item';

            const check = document.createElement('input');
            check.type = 'checkbox';
            check.id = item.id;
            check.tabIndex = 0;
            check.checked = item.checked;

            li.append(check)

            li.addEventListener('click',()=>{
                item.checked = !item.checked;
                taskList.save();
            })

            const label = document.createElement('label');
            label.htmlFor = item.id;
            label.textContent = item.item;
            li.append(label);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'button';
            deleteBtn.innerHTML = '&times';
            li.append(deleteBtn);

            deleteBtn.addEventListener('click',()=>{
                taskList.removeItem(item.id);
                this.render(taskList);
            })

            this.ul.append(li);
        });
    }

}