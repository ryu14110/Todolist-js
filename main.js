let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById('under-line');
let taskList = [];
let mode ="all";
let filterList = [];
// console.log(tabs)

tabs.forEach((menu)=>menu.addEventListener('click',(e)=>Indicator(e)));
function Indicator(e){
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top = 
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
};

addButton.addEventListener("click", addTask);

for(let i = 1; i < tabs.length; i++){
  tabs[i].addEventListener('click',function(event){filter(event)}); //All, notDone, Done
}

taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

taskInput.addEventListener('focus', function(){  //입력창에 focus 하면 기존숫자 clear 됨.
  taskInput.value = "";
});

function addTask(){
  mode = "all"
  let task ={
    id: randomIDGenerate(),
    taskContent : taskInput.value,
    isComplete : false,
  };
  taskList.push(task);
  // console.log(taskList);
  taskInput.value="";
  render();
}

function render(){
  let list =[]
  if(mode === "all"){
    list = taskList;
  }else if(mode === 'ongoing' || mode === 'done'){
    list = filterList;
  }
  let resultHTML = "";
  for(let i = 0; i < list.length; i++){
    if(list[i].isComplete === true){
      resultHTML +=`<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button class="my-btn" onclick="toggleComplete('${list[i].id}')">Check</button>
        <button class="my-btn" onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
        <button class="my-btn" onclick="toggleComplete('${list[i].id}')">Check</button>
        <button class="my-btn" onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    }    
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
  // console.log("id:",id);
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id === id){
      taskList[i].isComplete = !taskList[i].isComplete;  //switch 기능
      break;
    }
  }
  render();
  // console.log(taskList);
}

function deleteTask(id){
  // console.log("삭제하자",id);
  for(let i =0; i < taskList.length; i++){
    if(taskList[i].id === id){
      taskList.splice(i,1)
      break;
    }
  }
  render();
  // console.log(taskList)
}

function filter(event){
    // console.log("filter",event.target.id);
  mode = event.target.id
  filterList =[];
  if(mode === "all"){
    render();
  }else if(mode === "ongoing"){
    for(let i =0; i < taskList.length; i++){
      if(taskList[i].isComplete === false){
        filterList.push(taskList[i]);
      }
    } 
    // taskList = filterList 
    render(); 
      // console.log("filterList",filterList);  
  }else if(mode ==='done'){
    for(let i =0; i < taskList.length; i++){
      if(taskList[i].isComplete === true){
        filterList.push(taskList[i]);
      }
    } 
    render();
  }
}


function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}