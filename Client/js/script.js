
// Eventuale chiamata ajax;
//fetch("http://localhost:3000/dati").then((response) => response.json());

// Aspetta il caricamento del dom prima di invocare la funzione perchè 
// lo script è stato inserito nel head della pagina
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.dir(e.target[3].files[0]); // file che sto importando da form
        let data = new FormData()
        data.append('uploadFile', e.target[3].files[0]);
        // invio tramite una chiamata ajax il file al server
        fetch('http://localhost:3000/upload', {method: 'POST', body: data})
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    })
    
    document.querySelector('#sendEmail').addEventListener('click', () => {
        fetch('http://localhost:3000/mail', {method: 'POST', body: {}})
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))
    })

/*     let btnAll = document.querySelectorAll('form button');
    console.log(btnAll); */
})


