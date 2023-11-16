const form = document.getElementById('item-form')
const addBtn = document.querySelector('.btn')
const ul = document.getElementById('item-list')


function onAdd(e){
    e.preventDefault()
    const inputValue = form.querySelector('.form-input').value;
    const li = document.createElement('li')
    li.innerHTML = `
        ${inputValue}
        <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
        </button>` 

    ul.appendChild(li)
}


addBtn.addEventListener('click',onAdd)