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
            userInfo: null,
            todoList: null,
            usersId: null,
            filterRules: {
                status: 'all',
                userId: 0,
                filterTitle: '',
            },
            filteredTodoList: this.todoList,
        }
    },
    methods: {
        getTodo: function () {
            const vm = this;
            fetch('https://jsonplaceholder.typicode.com/todos', {cache: "no-cache"})
                .then((response) => response.json())
                .then((todos) => {
                    vm.todoList = todos;
                    vm.filteredTodoList = vm.todoList;
                    vm.usersId = [...new Set(todos.map(point => point.userId))]
                });
        },
        checkFields: function(e) {
            e.preventDefault();
            const vm = this;
            fetch('https://jsonplaceholder.typicode.com/users', {cache: "no-cache"})
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
        filterAll: function () {
            this.filteredTodoList = this.filteredTodoList.filter((item) => {
                item.some(cat => ((cat.completed === this.status) && cat.title.includes(this.filterTitle) && cat.userId === this.userId))
            })
        },
        filterByStatus: function () {
            this.filteredTodoList = this.filteredTodoList.filter((item) => {
                if (this.filterStatus === 'all') return item;
                if (this.filterStatus === 'completed') {
                   return item.completed === true;
                }
                if (this.filterStatus === 'uncompleted') {
                   return item.completed === false;
                }
            })
        },
        filterByUser: function () {
            this.filteredTodoList = this.filteredTodoList.filter((item) => {
                if (!this.filterUserId) return item;
                return item.userId === this.filterUserId;
            })
        },
        filterByTitle: function () {
            this.filteredTodoList = this.filteredTodoList.filter((item) => {
                if (!this.filterTitle) return item;
                return item.title.includes(this.filterTitle);
            })
        }
    }
})