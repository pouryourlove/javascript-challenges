// with the lecture
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);

  itemInput.value = "";
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

itemForm.addEventListener("submit", addItem);

//first trial
// const form = document.getElementById('item-form')
// const addBtn = document.querySelector('.btn')
// const ul = document.getElementById('item-list')

// function onAdd(e){
//     e.preventDefault()
//     const inputValue = form.querySelector('.form-input').value;
//     const li = document.createElement('li')
//     li.innerHTML = `
//         ${inputValue}
//         <button class="remove-item btn-link text-red">
//             <i class="fa-solid fa-xmark"></i>
//         </button>`

//     ul.appendChild(li)
// }

// addBtn.addEventListener('click',onAdd)
