import ListItem from "./ListItem.ts";

export interface List  {
    list:ListItem[],
    load():void,
    save():void,
    clearList():void,
    addItem(item:ListItem):void,
    removeItem(id:string):void
}

export default class TaskList implements List {
    static instance = new TaskList();

    private constructor(private _list: ListItem[] = []) {}


    get list(): ListItem[] {
        return this._list;
    }

    set list(value: ListItem[]) {
        this._list = value;
    }

    load() {
        let storedList:string|null = localStorage.getItem("list");
        if(!storedList) {
            console.log('no values');
            return
        }

        let parsedList:{_id:string,_item:string,_checked:boolean}[] = JSON.parse(storedList);

        parsedList.forEach(item => {
            TaskList.instance.addItem(new ListItem(item._id,item._item,item._checked));
        })
    }

    save() {
        localStorage.setItem("list",JSON.stringify(this.list));
    }

    clearList() {
        this.list = []
        this.save();
    }

    addItem(item: ListItem) {
        this.list.push(item);
        this.save();
    }

    removeItem(id: string) {
        this.list = this.list.filter(i => i.id !== id);
        this.save();
    }

}
