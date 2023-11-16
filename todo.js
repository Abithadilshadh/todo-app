let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const checkboxes = document.querySelectorAll('.custom-checkbox');


function addTaskToList(task){
   const li =document.createElement('li');
    li.innerHTML = `   
    <div> <input type="checkbox" id="${task.id}" ${task.done ? 'checked': ''}
        class="custom-checkbox">
        <label for="${task.id}">${task.text}</label></div>

        <span  class="delete" data-id="${task.id}" >\u00d7</span>
    `;
    tasksList.append(li);

}



function renderList(){
    tasksList.innerHTML = '';
for (let i =0; i< tasks.length; i++){
 addTaskToList(tasks[i]);
 updateCheckedCount();
}


}

function showNotification(text){
    alert(text);
}

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task Added Successfully');
        return;
    }
    showNotification('Task Cannot be Empty');

 }


 function handleInputKeypress(e){
    if(e.key==='Enter'){
        const text = e.target.value;
       
        if(!text){
            showNotification('Task cannot be Empty');
            return;
        }
        const task = {
            text,
            id:Date.now().toString(),
            done:false
        }
        e.target.value = '';
        addTask(task);
    }

 }

 function deleteTask (taskId) {
    
    if(taskId){
        const newTasks = tasks.filter(function (task){
            return task.id !== taskId
        });
        tasks = newTasks;
        renderList();
        showNotification('Task Deleted Successfully');
        return;
    }
    }
    function handleClickListener(e){
        const target = e.target;
        console.log(target);
    
        if(target.className === 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return
        }else if(target.className === 'custom-checkbox'){
          
             updateCheckedCount();
             return;
             
        }
        else if(target.className ==='add-button'){
            const text = addTaskInput.value;
       
            if(!text){
                showNotification('Task cannot be Empty');
                return;
            }
            const task = {
                text,
                id:Date.now().toString(),
                done:false
            }
            addTaskInput.value = '';
            addTask(task);
        }
    }
    

    function updateCheckedCount(){
        const checkedCheckboxes = document.querySelectorAll('.custom-checkbox:checked');
        
        Completedcount = checkedCheckboxes.length;
    
        tasksCounter.innerHTML = tasks.length- Completedcount;
    }

 addTaskInput.addEventListener('keyup',handleInputKeypress);

 document.addEventListener('click',handleClickListener);


