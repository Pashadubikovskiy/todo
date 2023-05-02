new Vue({
    el: '#app',
    data() {
        return {
            message: 'description',
            info: {
                username: 'Samantha',
                phone: '1-463-123-4447'
            },
            isLogged: false,
            userInfo: {},
            todoList: [],
            usersId: null,
            filterRules: {
                status: 'all',
                userId: 0,
                filterTitle: '',
            },
            toDo: {
                userId: null,
                title: '',
            },
            favoritesList: []
        }
    },
    computed: {
        filteredTodoList() {
            let toDoList = [...this.todoList]
            if(this.filterRules.status === 'completed') {
                toDoList = toDoList.filter((item) => item.completed)
            }
            if(this.filterRules.status === 'uncompleted') {
                toDoList = toDoList.filter((item) => !item.completed)
            }
            if(this.filterRules.status === 'favorites') {
                toDoList = toDoList.filter((item) => this.favoritesList.includes(item.id))
            }
            if(!!+this.filterRules.userId) {
                toDoList = toDoList.filter((item) => item.userId === this.filterRules.userId)
            }
            if(!!this.filterRules.filterTitle) {
                toDoList = toDoList.filter((item) => item.title.toLowerCase().includes(this.filterRules.filterTitle.toLowerCase()))
            }

            return toDoList
        }
    },
    mounted() {
        this.favoritesList = JSON.parse(localStorage.getItem('favorites')) || []
    },
    methods: {
        updateToDoItem: function (id) {
            const indexItem = this.todoList.findIndex((item) => item.id === id)
            this.todoList[indexItem].completed = !this.todoList[indexItem].completed
        },
        getTodo: function () {
            const vm = this;
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then((response) => response.json())
                .then((todos) => {
                    vm.todoList = todos;
                    vm.usersId = [...new Set(todos.map(point => point.userId))]
                });
        },
        updateTodo: function(todo) {
            const vm = this;
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then((response) => response.json())
                .then(() => {
                    vm.todoList = [todo, ...vm.todoList];
                });
        },
        checkFields: function() {
            const vm = this;
            fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
                .then((users) => {
                    let obj;
                    if (obj = users.find(user => user.username === vm.info.username)) {
                        vm.userInfo = obj;
                        if (obj.phone === vm.info.phone) {
                            vm.isLogged = true;
                            vm.getTodo();
                            return;
                        }
                        alert('error');
                        return;
                    }
                    alert('error');
                });
        },
        updateFavorites: function (id) {
            if(this.favoritesList.includes(id)) {
                this.favoritesList = this.favoritesList.filter((item) => item !== id)
            } else {
                this.favoritesList = [...this.favoritesList, id]
            }
            localStorage.setItem('favorites', JSON.stringify(this.favoritesList));
        },
        addToDo: function () {
            const toDo = {
                userId: +this.toDo.userId,
                id: this.todoList.length + 1,
                title: this.toDo.title,
                completed: false
            }
            this.updateTodo(toDo)
        }
    }
})
