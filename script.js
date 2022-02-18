let input = document.getElementById('input-main')
let button = document.getElementById('add-button')
let task = document.getElementById('name-task')
let fullList = document.getElementById('tasks')

let arrayTask = []
reloadTasks()

// Função que pega itam por item
function showTask() {
    let newList = ''

    arrayTask.forEach((task, index) => {
        newList = newList + `
            <li class="task-item ${task.completed == true ? 'conclude' : ''}">
                <button class="button-rocket" onclick="completeTask(${index})">
                    <i class="fa-solid fa-rocket"></i>
                </button>

                <p id="name-task ${task.completed == true ? 'conclude' : ''}">${task.task}</p>

                <button class="button-delete" onclick="deleteTask(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </li>`
    })

    fullList.innerHTML = newList

    // Salvando as informações no localStorage
    // localStorage só permite gravar textos, JSON.stringify vai transformar o array em textos

    localStorage.setItem('list', JSON.stringify(arrayTask))
}

// Deletar tarefa
const deleteTask = (index) => {
    arrayTask.splice(index, 1)

    showTask()
}

// Função que adiciona itens dentro do array
const addTask = () => {
    if(input.value){
        arrayTask.push({
            task: input.value,
            completed: false
        })
    }else {
        alert('Por favor digite uma tarefa!')
    }

    input.value = ""

    showTask()
}

// Tarefa concluida
const completeTask = (index) => {
    arrayTask[index].completed = !arrayTask[index].completed
    console.log(arrayTask)
    showTask()
}

// Função para recarregar tarefas
function reloadTasks(){
    let myTasks = localStorage.getItem('list')

    if(myTasks){
        arrayTask = JSON.parse(myTasks)
    
        showTask()
    }   
}

function addTaskEnter(keys){
    if(keys.key === "Enter") {
        addTask()
    }
}

button.addEventListener('click', addTask)

document.addEventListener('keypress', addTaskEnter)