
const form = document.querySelector('form');

const twitterelement = document.querySelector('.twitts')

const API_URL ='http://localhost:5000/twits'
const loadingElement =  document. querySelector('.loading');
loadingElement.style.display='none';
listalltwitter();
form.addEventListener('submit', (event) => {
    
    event.preventDefault(); //hold the data for further use

    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const data ={
        name,
        content
    };
    console.log(data); //
    form.style.display='none';
    loadingElement.style.display='';

    fetch(API_URL,{
        method:'POST',
        body: JSON.stringify(data),
        headers:{
            'content-type':'application/json'
        }
    }).then(response=>response.json())
    .then(createdtweet =>{
        console.log(createdtweet)
        form.reset();
        setTimeout(()=>{
            form.style.display=''
        },20000)
        form.style.display='';
        listalltwitter();
        loadingElement.style.display='none'
    })
})

function listalltwitter(){ //fetch all twitters during th page load
    twitterelement.innerHTML='';
    fetch(API_URL)
    .then(response=>response.json())
    .then(twitters=>{
        console.log(twitters)
        twitters.reverse();
        twitters.forEach(elements => {
            const div =document.createElement('div');
            const header =document.createElement('h3');
            header.innerText = elements.name;
            
            const content =document.createElement('p');
            content.innerText=elements.conten;

            const date = document.createElement('small')
            date.textContent=new Date(elements.created)
            console.log(header.textContent+" "+content.textContent)
    
            div.appendChild(header)
            div.appendChild(content)
            
            twitterelement.appendChild(div);
        });
        loadingElement.style.display='none'
    });
    
}
