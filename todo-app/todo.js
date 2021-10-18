const todoApp = (() => {
    const response = {
        "data": [
            {
                "id": "33db99ab-39bf-424a-a6f2-ca76f17742ad",
                "name": "overriding Self-enabling bypassing portal",
                "isDone": true
            },
            {
                "id": "e4388c4d-eeba-4d9c-acd4-fefaa6349469",
                "name": "matrix overriding Credit Card Account Pants",
                "isDone": true
            },
            {
                "id": "44cda884-cee1-4ceb-ba63-09fbffd2eae0",
                "name": "connecting Lao People's Democratic Republic navigate Frozen",
                "isDone": false
            },
            {
                "id": "a5aa5e5b-92f9-476c-9d15-247cf8e878b3",
                "name": "structure Gourde US Dollar Buckinghamshire virtual",
                "isDone": false
            },
            {
                "id": "eb5aea24-f011-4a93-9920-fe477304d5aa",
                "name": "Cambridgeshire Supervisor Wooden content-based",
                "isDone": false
            },
            {
                "id": "20032e18-5509-4ed7-93ec-505e4af6758a",
                "name": "Frozen compressing Industrial Nigeria",
                "isDone": true
            }
        ]
    };
    const addTodoBtn = document.getElementById("addTodo");
    const todoFilters = document.getElementById("todoFilters");
    const todoList = document.getElementById("todoList");
    const todoText = document.getElementById("todo");
    const FILTERS = {
        ALL : "all",
        COMPLETED: "completed",
        ACTIVE: "active"
    };
    let { data } = response;

    const initialize = () => {
        updateTodoListContainer(data);
    }

    const updateTodoListContainer = (data) => {
        const docFrag = document.createDocumentFragment();
        data.forEach(todo => {
            const li = createListItem(todo);
            docFrag.appendChild(li);
        });

        todoList.appendChild(docFrag);
    };

    const createListItem = (todo) => {
        const li = document.createElement("li");
        li.innerText = todo.name;
        li.id = todo.id;

        if (todo.isDone) {
            li.classList.add("completed");
        }

        return li;
    };

    const handleFilterClick = (event => {
        console.time('testForEach');
        const currFilter = event.target.id;
        const children = todoList.children;
        switch (currFilter) {
            case FILTERS.COMPLETED:
                [...children].forEach(child => !child.classList.contains("completed") ? child.classList.add('hide') : child.classList.remove("hide"));
                break;
            case FILTERS.ACTIVE:
                [...children].forEach(child => child.classList.contains("completed") ? child.classList.add("hide") : child.classList.remove("hide"));
                break;
            case FILTERS.ALL:
                [...children].forEach(child => child.classList.remove("hide"));
                break;
        }

        // let filteredList = [];
        //
        // switch (currFilter) {
        //     case FILTERS.ALL:
        //         filteredList = [ ...data];
        //         break;
        //     case FILTERS.COMPLETED:
        //         filteredList = data.filter(todo => todo.isDone === true);
        //         break;
        //     case FILTERS.ACTIVE:
        //         filteredList = data.filter(todo  => todo.isDone === false);
        //         break;
        // }
        //
        // todoList.innerHTML = '';
        // updateTodoListContainer(filteredList);
        // console.timeEnd('testForEach');


        // ==== Profiling for toggling the classname with existing list items =====
        // testForEach: 0.233154296875 ms
        // todo.js:89 testForEach: 0.161865234375 ms
        // todo.js:89 testForEach: 0.164794921875 ms

        // ==== Profiling for recreating the list items ====
        // testForEach: 0.364013671875 ms
        // todo.js:106 testForEach: 0.37109375 ms
        // todo.js:106 testForEach: 0.223876953125 ms
    });

    const handleAddTodo = (event) => {
        const newTodo = {
            id: Math.random(),
            name: todoText.value,
            isDone: false
        };

        data = [...data, newTodo];

        todoList.appendChild(createListItem(newTodo));
        todoText.value = '';
    };


    todoFilters.addEventListener("click", handleFilterClick);
    addTodoBtn.addEventListener("click", handleAddTodo);

    return {
      initialize
    };
})();

document.addEventListener("DOMContentLoaded", todoApp.initialize);

