//! OPERAZIONI DA FARE AD AVVIO PAGINA
// Recupero gli elementi di interesse dalla pagina
const addButton = document.querySelector('.addButton');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');
const deleteButton = document.querySelector('.deleteButton');
const deleteAllButton = document.querySelector('.deleteAllButton');
const list = document.querySelector('ul');

//! Creo una chiave per il local storage
const STORAGE_KEY = '__bool_todo__';

// Preparo una lista di attività
let activities = [];

// Controllo se per caso c'erano delle attività nel local storage
const storage = localStorage.getItem(STORAGE_KEY);
if (storage) {
    activities = JSON.parse(storage);
}

// Chiedo a JS di decidere cosa mostrare
checkedAttivity()
showContent();


//! OPERAZIONI DINAMICHE 

// Reagisco al click del bottone
addButton.addEventListener('click', () => {
    // Chiedo di aggiungre l'attività
    addActivity();
    
});

// bottone calcella e svuota local storage
deleteButton.addEventListener('click', () => {
    deleteItems();
});

//svuota la lista
deleteAllButton.addEventListener('click', () => {
    deleteAll();
});

//! FUNZIONI RICHIAMATE
// Funzione che decide cosa mostrare in pagina
function showContent() {
    // Innanzitutto pulisco tutto
    todoList.innerText = '';
    emptyListMessage.innerText = '';
    

    if (activities.length > 0) {
        // Se c'è almeno una attività...
        // per ciascuna attività...
        activities.forEach(function (activity) {
            // Crea un template HTML
            const template = createActivityTemplate(activity)

            // Inseriscilo in pagina
            todoList.innerHTML += template;
        });
        

        // Rendi cliccabili i check
        makeCheckClickable();
        

    } else {
        // ALTRIMENTI
        // Mostra il messaggio di lista vuota
        emptyListMessage.innerText = 'Non ci sono attività';
    }
}

// Funzione per rendere i check cliccabili
function makeCheckClickable() {
    // Cerca tutti i check e fa' sì che siano cliccabili
    const checks = document.querySelectorAll('.todo-check');
    // Per ognuno dei check...
    checks.forEach(function (check, index) {
        // Aggiungi una reazione al click
        check.addEventListener('click', () => {
            // Rimuovi l'elemento dalla lista
            let domanda = confirm("Sei sicuro di voler rimuovere il partecipante?");
            if (domanda === true) {
                activities.splice(index, 1);
            } else {
                alert('Operazione annullata');
            }

            // Aggiorna anche il localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

            // Aggiorna la lista in pagina
            showContent();
        });
    })
}

// Funzione per aggiungere un'attività
function addActivity() {
    // Recupero il testo nel campo
    const newActivity = inputField.value.trim();

    // Se il campo non è vuoto... 
    if (newActivity.length > 0) {

        // Aggiungo l'attività alla lista
        activities.push(newActivity);

        // Aggiorna lo storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

        // Ora, ridecidi cosa mostrare
        showContent();

        // svuoto il campo
        inputField.value = '';
    }
}

// Funzione che crea un template HTML per un'attività
function createActivityTemplate(activity) {
    // Restituisci questo pezzo di HTML
    return `
   <li class="todo-item">
     <div class="todo-check">
        <i class="fa-solid fa-check"></i>
     </div>
     <p class="todo-text">${activity}</p>
   </li>
   `;
}

//Funzione per svuotare il local storage
function deleteItems() {
    localStorage.clear();
}

//Funzione svuota lista
function deleteAll() {
    // Cerca tutti i check e fa' sì che siano cliccabili
    const checks = document.querySelectorAll('.todo-check');
    // Per ognuno dei check...
    checks.forEach(function (check, index) {
        // Svuota l'intero array
        activities.splice(0, activities.length);

        // Aggiorna anche il localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));

        // Aggiorna la lista in pagina
        showContent();
    })
}

// Funzione che spunta le attività
function checkedAttivity() {
    list.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);
}
