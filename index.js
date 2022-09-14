const inputLink = document.getElementById('inputLink')
const postLink = document.getElementById('postLink')
const form = document.querySelector('#form')
const displayELement = document.querySelectorAll('.display');
const shortLink = document.getElementById('shortLink')
const statusMessage = document.getElementById('status')

// const url = 'http://127.0.0.1:8000'
const url = 'https://urlsrtnr.herokuapp.com'


const displaythem  = () => {
    displayELement.forEach((e) => {
        e.style.visibility = 'visible';
    } )

}

const hidethem = () => {
    displayELement.forEach((e) => {
        e.style.visibility = 'hidden';
    } )

}

inputLink.addEventListener('input', () => {
    hidethem();
    shortLink.innerText = "";
    statusMessage.innerText = "";
})

postLink.addEventListener('click', () => {
    let link = inputLink.value

    if (!(link.startsWith('https://'))) {
        inputLink.value = 'https://' + link
    }
})

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    if(inputLink.value){
        const data = { link: inputLink.value }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }
    
        const res = await fetch(`${url}/link`, options)
        const chunk = await res.json()
        
        if(chunk) {
                displaythem();
                statusMessage.innerText = chunk.existing ? 'Linked Already Existed!!!' : 'Link Created Successfully.'
                shortLink.innerText = `${url}/${chunk.shortUrl}`
            }
    }
    
})

shortLink.addEventListener('click', (e) =>{
    navigator.clipboard.writeText(shortLink.innerText);
    alert(`${shortLink.innerText} Copied to clipboard`)
})
