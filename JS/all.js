//Vue 應用程式
let app = new Vue({
    el : "#app",
    data : {
        taskData : JSON.parse(localStorage.getItem("task")) || [],
        taskTitle: "",
        completed : "",
    },
    methods : {
        addTask(){
            let vm = this;
            let newTask = {};
            let newTaskTitle = vm.taskTitle;
            if (newTaskTitle){
                newTask.id = Math.floor(Date.now());
                newTask.title = newTaskTitle;
                newTask.completed = false;
                vm.taskData.unshift(newTask);
            } else if (!newTaskTitle){
                alert("請輸入正確的任務內容");
            };
            localStorage.setItem("task",JSON.stringify(this.taskData));
            this.taskTitle = "";
        },
        removeTask(task){
            //宣告vm去存取外面的資料this
            let vm = this;
            vm.taskData.forEach(function(item,index){
                if(task.id == item.id){
                    vm.taskData.splice(index,1)
                }
            });
            localStorage.setItem("task", JSON.stringify(this.taskData));
        }
    },
    computed : {
        filterData(){
            let vm = this;
            let filter = vm.completed;
            let newData = vm.taskData.filter(function(item){
                if(filter == "all" || filter == ""){
                    return item
                }else if (filter == "doing" && item.completed == false){
                    return item
                }else if (filter == "done" && item.completed == true){
                    return item
                }
            });
            localStorage.setItem("task", JSON.stringify(this.taskData));
            return newData
        }
    },
});
