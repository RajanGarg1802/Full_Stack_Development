let btn = document.getElementById("taskSubmit");
let taskName = document.getElementById("inputName");
let taskPriority = document.getElementById("myPriority");
let output = document.getElementById("outputList");
let showAll = document.getElementById("showAll")
let showCompleted = document.getElementById("completed")
let showPending = document.getElementById("pending")
let allTask = [];
btn.addEventListener("click",showTasks());
function showTasks() {
    let task = {
        name: taskName.value,
        priority: taskPriority.value,
        status: "Pending",
    }
    let list = document.createElement("li");
    list.innerText = task.name + " | Priority: " + task.priority + " | Status: " + task.status;
    
    let statusbtn = document.createElement("button");
    statusbtn.innerText = "Complete";
    statusbtn.addEventListener("click", function(){
        status = "Completed";
        list.innerText = name + " | Priority: " + priority + " | Status: " + status + " ";
    })
    allTask.push(task);
    list.appendChild(statusbtn);
    output.appendChild(list);
}
showAll.addEventListener("click", function(){
    showTasks(allTask);
});

showCompleted.addEventListener("click",function(){
    let completedTasks = []
    for(let task of allTask){
        if(allTask[task].status == "Completed"){
            completedTasks.push(allTask[task]);
        }
    }
    showTasks(completedTasks);
});
showPending.addEventListener("click",function(){
    let pendingTasks = []
    for(let task of allTask){
        if(allTask[task].status == "Pending"){
            completedTasks.push(allTask[task]);
        }
    }
    showTasks(completedTasks);
});