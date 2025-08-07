// script.js
 
//Seleciona os elementos do HTML com os quais vamos interagir
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
 
//Tenta carregar as tarefas do localStorage. Se não houver nada, começa com um array vazio.
//JSON.parse() transforma o texto guardado de volta em um objeto/array JavaScript.
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
 
//Função para salvar as tarefas no localStorage.
//JSON.stringify() transforma nosso array de tarefas em uma string para poder ser guardado.
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
 
//Função para renderizar (desenhar) a lista de tarefas na tela
function renderTasks() {
    //Limpa a lista atual para não duplicar itens
    taskList.innerHTML = '';
 
    //Para cada tarefa no nosso array, cria um elemento <li> e o adiciona na lista <ul>
    tasks.forEach((taskText, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
 
        //O texto da tarefa
        const span = document.createElement('span');
        span.textContent = taskText;
 
        //Área para os botões de ação
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'action';
 
        //Botão de Editar
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏'; //icone de lapis
        editBtn.onclick = () => editTask(index);

        //Botão de Remover
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '🗑';//Ícone da lixeira
        removeBtn.onclick = () => removeTask(index);
 
        //Adiciona os elementos na estrutura: <span> e botões dentro do <li>
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(removeBtn);
        li.appendChild(span);
        li.appendChild(actionsDiv);
 
        //Adiciona o item <li> completo na lista <ul>
        taskList.appendChild(li);
    });
}
 
//Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim(); //Pega o texto e remove espaços em branco
    if (taskText) { //verifica se o texto não está vazio
        tasks.push(taskText); //Adiciona a nova tarefa ao nosso array
        taskInput.value = ''; //Limpa o campo de input
        saveTasks(); //Salva o array atualizado no localStorage
        renderTasks(); //Redesenhada a lista na tela
    }
}
 
//Função para remover uma tarefa
/**
 * Remove uma tarefa após pedir confirmação ao usuário
 * @param {number} index - A posição da tarefa a ser removida
 */
function removeTask(index){
    //Pega o texto da tarefa que será excluído para ser usado na mensagem
    const taskText = tasks[index];
 
    //Cria a mensagem de confirmação, inclindo um emojivde alerta
    const confirmationMessage = `🤔 Tem certeza que deseja remover a tarefa: "${taskText}"?`;

    //Exibe a caixa de diálogo de confirmação.
    //O código dentro do 'if' só será executado se o usuário clicar em "ok".
    if(confirm(confirmationMessage)) {
        //Se o usuário confirmou (clicou em "ok"):

        //Remove 1 item a partir do'index' do array.
        tasks.splice(index,1);

        //Salva o novo estado do array no localStorage.
        saveTasks();

        //Redesenha a lista na tela para refletir a remoção.
        renderTasks();
    }
    //Se o usuário clicar em "Cancelar", nada acontece e a função termina.
}

//Função para editar uma tarefa
function editTask(index) {
    const currentTask = tasks[index];
    const newTaskText = prompt('📖 Edite sua tarefa:', currentTask); //Abre uma caixa de diálogo

    if(newTaskText !== null && newTaskText.trim() !== '') {
        tasks[index] = newTaskText.trim(); //Atualiza a tarefa array
        saveTasks();
        renderTasks();
    }
}

//Adiciona o "ouvinte de evento" para o botão. A função addTask será chamada ao clicar.
addTaskBtn.addEventListener('click', addTask);

//Permite adicionar tarefa apertando "ENTER" no teclado
taskInput.addEventListener('keypress', (e) =>{
    if (e.key === 'Enter'){
        addTask();
    }
});

//Renderiza as tarefas que já estavam salvas assim que a página carrega
renderTasks();
 