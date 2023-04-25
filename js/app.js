const { createApp } = Vue

createApp({
    data() {
        return {
            message: 'description',
            info: {
                username: null,
                phone: null
            },
            lo
        }
    },
    methods: {
        checkFields: function() {
            const vm = this;
            fetch('https://jsonplaceholder.typicode.com/users', {cache: "no-cache"})
                .then((response) => response.json())
                .then((users) => {
                    let obj;
                    if (obj = users.find(user => user.username === vm.info.username)) {
                        if (obj.phone === vm.info.phone) {
                            vm.message = 'success';
                            return;
                        }
                        vm.message = 'error'
                        return;
                    }
                    vm.message = 'error'
                });
        }
    }
}).mount('#app')