const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear")
const itemFilter = document.getElementById("filter")
const formBtn = itemForm.querySelector("button")
let isEditMode = false;

function displayItems(){
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(item => addItemToDOM(item))
  checkUI()
}

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Check for edit mode
  if(isEditMode){
    const itemToEdit = itemList.querySelector(".edit-mode")

    removeItemFromStorage(itemToEdit.textContent)
    itemToEdit.classList.remove("edit-mode")
    itemToEdit.remove()
    isEditMode = false

  }

  //create item DOM element
  addItemToDOM(newItem)

  //add item to local storage
  addItemToStorage(newItem)

  checkUI()

  itemInput.value = "";
}

function addItemToDOM(item){
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);
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

function addItemToStorage(item){
  const itemsFromStorage = getItemsFromStorage()

  itemsFromStorage.push(item)

  //convert to JSON string and set to local storage
  localStorage.setItem("items",JSON.stringify(itemsFromStorage))

}

function getItemsFromStorage(){
  let itemsFromStorage;

  if(localStorage.getItem('items') === null){
    itemsFromStorage = []
  }else{
    itemsFromStorage = JSON.parse(localStorage.getItem("items"))
  }

  return itemsFromStorage

}

function onClickItem(e){
  if(e.target.parentElement.classList.contains("remove-item")){
    deleteItem(e.target.parentElement.parentElement)
  }else{
    setItemEdit(e.target)
  }
  
}

function setItemEdit(item){
  isEditMode = true;
  item.classList.add("edit-mode")
  formBtn.innerHTML='<i class="fa-solid fa-pen"></i> Update Item'
  formBtn.style.backgroundColor = "#228b22"
  itemInput.value = item.textContent
}



function deleteItem(item){
  
    if(confirm("Are you sure?")){
       item.remove();
       removeItemFromStorage(item.textContent)
       checkUI()
    }
   }

function removeItemFromStorage(item){
  let itemsFromStorage = getItemsFromStorage()
  itemsFromStorage = itemsFromStorage.filter((i) => i != item)

  localStorage.setItem("items",JSON.stringify(itemsFromStorage))
}   


function clearAll(){
   while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild)
   }
   checkUI()
}

function filterItems(e){
  const items = itemList.querySelectorAll("li")
  const text = e.target.value.toLowerCase()

  items.forEach((item) => {
    const itemsName= item.firstChild.textContent.toLowerCase()

    if(itemsName.indexOf(text)!=-1){
      item.style.display = "flex";
    }else{
      item.style.display = "none";
    }
  })
 
}

function checkUI(){
  itemInput.value = ""
    //everytime function runs, we are taking the item
    const items = itemList.querySelectorAll("li")
    if(items.length === 0){
        clearBtn.style.display = "none"
        itemFilter.style.display = "none"
    }else{
        clearBtn.style.display = "block"
        itemFilter.style.display = "block"
    }
    formBtn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor = "#333"
    isEditMode = false;
}

function init(){
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem)
  clearBtn.addEventListener("click",clearAll)
  itemFilter.addEventListener("input",filterItems)
  document.addEventListener("DOMContentLoaded",displayItems)

//when page loads
checkUI()
}

init()





// const itemForm = document.getElementById("item-form");
// const itemInput = document.getElementById("item-input");
// const itemList = document.getElementById("item-list");
// const clearBtn = document.getElementById("clear")
// const itemFilter = document.getElementById("filter")
// const formBtn = itemForm.querySelector("button")
// let isEditMode = false; 

// function displayItems(){
//   const itemsFromStorage = getItemsFromStorage();
//   itemsFromStorage.forEach(item => addItemToDOM(item))
//   checkUI()
// }

// function onAddItemSubmit(e) {
//   e.preventDefault();

//   const newItem = itemInput.value;

//   //Validate Input
//   if (newItem === "") {
//     alert("Please add an item");
//     return;
//   }
//   //create item DOM element
//   addItemToDOM(newItem)

//   //add item to local storage
//   addItemToStorage(newItem)

//   checkUI()

//   itemInput.value = "";
// }

// function addItemToDOM(item){
//   // Create list item
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(item));

//   const button = createButton("remove-item btn-link text-red");
//   li.appendChild(button);

//   itemList.appendChild(li);
// }



// function createButton(classes) {
//   const button = document.createElement("button");
//   button.className = classes;
//   const icon = createIcon("fa-solid fa-xmark");
//   button.appendChild(icon);
//   return button;
// }

// function createIcon(classes) {
//   const icon = document.createElement("i");
//   icon.className = classes;
//   return icon;
// }

// function addItemToStorage(item){
//   const itemsFromStorage = getItemsFromStorage()

//   itemsFromStorage.push(item)

//   //convert to JSON string and set to local storage
//   localStorage.setItem("items",JSON.stringify(itemsFromStorage))

// }

// function getItemsFromStorage(){
//   let itemsFromStorage;

//   if(localStorage.getItem('items') === null){
//     itemsFromStorage = []
//   }else{
//     itemsFromStorage = JSON.parse(localStorage.getItem("items"))
//   }

//   return itemsFromStorage

// }

// function onClickItem(e){
//   if(e.target.parentElement.classList.contains("remove-item")){
//     deleteItem(e.target.parentElement.parentElement)
//   } else {
//     setItemToEdit(e.target)
//   }
  
// }

// function setItemToEdit(item){
//   isEditMode = true;
//   itemList.querySelectorAll("li").forEach(i => i.classList.remove("edit-mode"))
//   item.classList.add("edit-mode")
//   formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
//   formBtn.style.backgroundColor = "#228b22"
//   itemInput.value = item.textContent
// }

// function deleteItem(item){
  
//     if(confirm("Are you sure?")){
//        item.remove();
//        removeItemFromStorage(item.textContent)
//        checkUI()
//     }
//    }

// function removeItemFromStorage(item){
//   let itemsFromStorage = getItemsFromStorage()
//   itemsFromStorage = itemsFromStorage.filter((i) => i != item)

//   localStorage.setItem("items",JSON.stringify(itemsFromStorage))
// }   


// function clearAll(){
//    while(itemList.firstChild){
//     itemList.removeChild(itemList.firstChild)
//    }
//    checkUI()
// }

// function filterItems(e){
//   const items = itemList.querySelectorAll("li")
//   const text = e.target.value.toLowerCase()

//   items.forEach((item) => {
//     const itemsName= item.firstChild.textContent.toLowerCase()

//     if(itemsName.indexOf(text)!=-1){
//       item.style.display = "flex";
//     }else{
//       item.style.display = "none";
//     }
//   })
 
// }

// function checkUI(){
//     //everytime function runs, we are taking the item
//     const items = itemList.querySelectorAll("li")
//     if(items.length === 0){
//         clearBtn.style.display = "none"
//         itemFilter.style.display = "none"
//     }else{
//         clearBtn.style.display = "block"
//         itemFilter.style.display = "block"
//     }
// }

// function init(){
//   itemForm.addEventListener("submit", onAddItemSubmit);
//   itemList.addEventListener("click", onClickItem)
//   clearBtn.addEventListener("click",clearAll)
//   itemFilter.addEventListener("input",filterItems)
//   document.addEventListener("DOMContentLoaded",displayItems)

// //when page loads
// checkUI()
// }

// init()

















// const itemForm = document.getElementById("item-form");
// const itemInput = document.getElementById("item-input");
// const itemList = document.getElementById("item-list");
// const clearBtn = document.getElementById("clear")
// const itemFilter = document.getElementById("filter")

// function displayItems(){
//   const itemsFromStorage = getItemsFromStorage();
//   itemsFromStorage.forEach(item => addItemToDOM(item))
//   checkUI()
// }

// function onAddItemSubmit(e) {
//   e.preventDefault();

//   const newItem = itemInput.value;

//   //Validate Input
//   if (newItem === "") {
//     alert("Please add an item");
//     return;
//   }
//   //create item DOM element
//   addItemToDOM(newItem)

//   //add item to local storage
//   addItemToStorage(newItem)

//   checkUI()

//   itemInput.value = "";
// }

// function addItemToDOM(item){
//   // Create list item
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(item));

//   const button = createButton("remove-item btn-link text-red");
//   li.appendChild(button);

//   itemList.appendChild(li);
// }



// function createButton(classes) {
//   const button = document.createElement("button");
//   button.className = classes;
//   const icon = createIcon("fa-solid fa-xmark");
//   button.appendChild(icon);
//   return button;
// }

// function createIcon(classes) {
//   const icon = document.createElement("i");
//   icon.className = classes;
//   return icon;
// }

// function addItemToStorage(item){
//   const itemsFromStorage = getItemsFromStorage()

//   itemsFromStorage.push(item)

//   //convert to JSON string and set to local storage
//   localStorage.setItem("items",JSON.stringify(itemsFromStorage))

// }

// function getItemsFromStorage(){
//   let itemsFromStorage;

//   if(localStorage.getItem('items') === null){
//     itemsFromStorage = []
//   }else{
//     itemsFromStorage = JSON.parse(localStorage.getItem("items"))
//   }

//   return itemsFromStorage

// }

// function onClickItem(e){
//   if(e.target.parentElement.classList.contains("remove-item")){
//     deleteItem(e.target.parentElement.parentElement)
//   }
  
// }

// function deleteItem(item){
  
//     if(confirm("Are you sure?")){
//        item.remove();
//        removeItemFromStorage(item.textContent)
//        checkUI()
//     }
//    }

// function removeItemFromStorage(item){
//   let itemsFromStorage = getItemsFromStorage()
//   itemsFromStorage = itemsFromStorage.filter((i) => i != item)

//   localStorage.setItem("items",JSON.stringify(itemsFromStorage))
// }   


// function clearAll(){
//    while(itemList.firstChild){
//     itemList.removeChild(itemList.firstChild)
//    }
//    checkUI()
// }

// function filterItems(e){
//   const items = itemList.querySelectorAll("li")
//   const text = e.target.value.toLowerCase()

//   items.forEach((item) => {
//     const itemsName= item.firstChild.textContent.toLowerCase()

//     if(itemsName.indexOf(text)!=-1){
//       item.style.display = "flex";
//     }else{
//       item.style.display = "none";
//     }
//   })
 
// }

// function checkUI(){
//     //everytime function runs, we are taking the item
//     const items = itemList.querySelectorAll("li")
//     if(items.length === 0){
//         clearBtn.style.display = "none"
//         itemFilter.style.display = "none"
//     }else{
//         clearBtn.style.display = "block"
//         itemFilter.style.display = "block"
//     }
// }

// function init(){
//   itemForm.addEventListener("submit", onAddItemSubmit);
//   itemList.addEventListener("click", onClickItem)
//   clearBtn.addEventListener("click",clearAll)
//   itemFilter.addEventListener("input",filterItems)
//   document.addEventListener("DOMContentLoaded",displayItems)

// //when page loads
// checkUI()
// }

// init()













// const itemForm = document.getElementById("item-form");
// const itemInput = document.getElementById("item-input");
// const itemList = document.getElementById("item-list");
// const clearBtn = document.getElementById("clear")
// const itemFilter = document.getElementById("filter")

// function displayItems(){
//   const itemsFromStorage = getItemsFromStorage();
//   itemsFromStorage.forEach(item => addItemToDOM(item))
//   checkUI()
// }

// function onAddItemSubmit(e) {
//   e.preventDefault();

//   const newItem = itemInput.value;

//   //Validate Input
//   if (newItem === "") {
//     alert("Please add an item");
//     return;
//   }
//   //create item DOM element
//   addItemToDOM(newItem)

//   //add item to local storage
//   addItemToStorage(newItem)

//   checkUI()

//   itemInput.value = "";
// }

// function addItemToDOM(item){
//   // Create list item
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(item));

//   const button = createButton("remove-item btn-link text-red");
//   li.appendChild(button);

//   itemList.appendChild(li);
// }



// function createButton(classes) {
//   const button = document.createElement("button");
//   button.className = classes;
//   const icon = createIcon("fa-solid fa-xmark");
//   button.appendChild(icon);
//   return button;
// }

// function createIcon(classes) {
//   const icon = document.createElement("i");
//   icon.className = classes;
//   return icon;
// }

// function addItemToStorage(item){
//   const itemsFromStorage = getItemsFromStorage()

//   itemsFromStorage.push(item)

//   //convert to JSON string and set to local storage
//   localStorage.setItem("items",JSON.stringify(itemsFromStorage))

// }

// function getItemsFromStorage(){
//   let itemsFromStorage;

//   if(localStorage.getItem('items') === null){
//     itemsFromStorage = []
//   }else{
//     itemsFromStorage = JSON.parse(localStorage.getItem("items"))
//   }

//   return itemsFromStorage

// }


// function deleteItem(e){
//    if(e.target.parentElement.classList.contains("remove-item")){
//     if(confirm("Are you sure?")){
//         e.target.parentElement.parentElement.remove();
//         checkUI()
//     }
//    }
// }

// function clearAll(){
//    while(itemList.firstChild){
//     itemList.removeChild(itemList.firstChild)
//    }
//    checkUI()
// }

// function filterItems(e){
//   const items = itemList.querySelectorAll("li")
//   const text = e.target.value.toLowerCase()

//   items.forEach((item) => {
//     const itemsName= item.firstChild.textContent.toLowerCase()

//     if(itemsName.indexOf(text)!=-1){
//       item.style.display = "flex";
//     }else{
//       item.style.display = "none";
//     }
//   })
 
// }



// function checkUI(){
//     //everytime function runs, we are taking the item
//     const items = itemList.querySelectorAll("li")
//     if(items.length === 0){
//         clearBtn.style.display = "none"
//         itemFilter.style.display = "none"
//     }else{
//         clearBtn.style.display = "block"
//         itemFilter.style.display = "block"
//     }
// }

// function init(){
//   itemForm.addEventListener("submit", onAddItemSubmit);
//   itemList.addEventListener("click",deleteItem)
//   clearBtn.addEventListener("click",clearAll)
//   itemFilter.addEventListener("input",filterItems)
//   document.addEventListener("DOMContentLoaded",displayItems)

// //when page loads
// checkUI()
// }

// init()










// const itemForm = document.getElementById("item-form");
// const itemInput = document.getElementById("item-input");
// const itemList = document.getElementById("item-list");
// const clearBtn = document.getElementById("clear")
// const itemFilter = document.getElementById("filter")


// function onAddItemSubmit(e) {
//   e.preventDefault();

//   const newItem = itemInput.value;

//   //Validate Input
//   if (newItem === "") {
//     alert("Please add an item");
//     return;
//   }
//   //create item DOM element
//   addItemToDOM(newItem)

//   //add item to local storage
//   addItemToStorage(newItem)

//   checkUI()

//   itemInput.value = "";
// }

// function addItemToDOM(item){
//   // Create list item
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(item));

//   const button = createButton("remove-item btn-link text-red");
//   li.appendChild(button);

//   itemList.appendChild(li);
// }

// function addItemToStorage(item){
//   let itemsFromStorage;

//   if(localStorage.getItem('items') === null){
//     itemsFromStorage = []
//   }else{
//     itemsFromStorage = JSON.parse(localStorage.getItem("items"))
//   }

//   itemsFromStorage.push(item)

//   //convert to JSON string and set to local storage
//   localStorage.setItem("items",JSON.stringify(itemsFromStorage))

// }

// function createButton(classes) {
//   const button = document.createElement("button");
//   button.className = classes;
//   const icon = createIcon("fa-solid fa-xmark");
//   button.appendChild(icon);
//   return button;
// }

// function createIcon(classes) {
//   const icon = document.createElement("i");
//   icon.className = classes;
//   return icon;
// }

// function deleteItem(e){
//    if(e.target.parentElement.classList.contains("remove-item")){
//     if(confirm("Are you sure?")){
//         e.target.parentElement.parentElement.remove();
//         checkUI()
//     }
//    }
// }

// function clearAll(){
//    while(itemList.firstChild){
//     itemList.removeChild(itemList.firstChild)
//    }
//    checkUI()
// }

// function filterItems(e){
//   const items = itemList.querySelectorAll("li")
//   const text = e.target.value.toLowerCase()

//   items.forEach((item) => {
//     const itemsName= item.firstChild.textContent.toLowerCase()

//     if(itemsName.indexOf(text)!=-1){
//       item.style.display = "flex";
//     }else{
//       item.style.display = "none";
//     }
//   })
 
// }



// function checkUI(){
//     //everytime function runs, we are taking the item
//     const items = itemList.querySelectorAll("li")
//     if(items.length === 0){
//         clearBtn.style.display = "none"
//         itemFilter.style.display = "none"
//     }else{
//         clearBtn.style.display = "block"
//         itemFilter.style.display = "block"
//     }
// }

// itemForm.addEventListener("submit", onAddItemSubmit);
// itemList.addEventListener("click",deleteItem)
// clearBtn.addEventListener("click",clearAll)
// itemFilter.addEventListener("input",filterItems)

// //when page loads
// checkUI()




// const itemForm = document.getElementById("item-form");
// const itemInput = document.getElementById("item-input");
// const itemList = document.getElementById("item-list");
// const clearBtn = document.getElementById("clear")
// const filter = document.getElementById("filter")


// function addItem(e) {
//   e.preventDefault();

//   const newItem = itemInput.value;

//   //Validate Input
//   if (newItem === "") {
//     alert("Please add an item");
//     return;
//   }
//   // Create list item
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(newItem));

//   const button = createButton("remove-item btn-link text-red");
//   li.appendChild(button);

//   itemList.appendChild(li);

//   checkUI()

//   itemInput.value = "";
// }

// function createButton(classes) {
//   const button = document.createElement("button");
//   button.className = classes;
//   const icon = createIcon("fa-solid fa-xmark");
//   button.appendChild(icon);
//   return button;
// }

// function createIcon(classes) {
//   const icon = document.createElement("i");
//   icon.className = classes;
//   return icon;
// }

// function removeItem(e){
//     if(e.target.parentElement.classList.contains("remove-item")){
//         e.target.parentElement.parentElement.remove()
//     }
//     checkUI()
// }

// function clearItems(){
//     while(itemList.firstChild){
//         itemList.removeChild(itemList.firstChild)
//     }
//     checkUI()
// }

// function filterItems(e){
//     const items = itemList.querySelectorAll("li")
//     const text = e.target.value.toLowerCase();

//     items.forEach(item => {
//         const itemName = item.firstChild.textContent.toLowerCase();
        
//         if(itemName.indexOf(text) != -1){
//             item.style.display = "flex"
//         } else {
//             item.style.display = "none"
//         }
//     })

// }


// function checkUI(){
//     const items = itemList.querySelectorAll("li")
//     if(items.length === 0){
//         filter.style.display = "none"
//         clearBtn.style.display = "none"

//     } else {
//         filter.style.display = "block"
//         clearBtn.style.display = "block"
//     }

// }

// itemForm.addEventListener("submit", addItem);
// itemList.addEventListener("click",removeItem);
// clearBtn.addEventListener("click",clearItems);
// filter.addEventListener("input",filterItems)

// checkUI()













//lecture
// const itemForm = document.getElementById("item-form");
// const itemInput = document.getElementById("item-input");
// const itemList = document.getElementById("item-list");
// const clearBtn = document.getElementById("clear")
// const itemFilter = document.getElementById("filter")


// function addItem(e) {
//   e.preventDefault();

//   const newItem = itemInput.value;

//   //Validate Input
//   if (newItem === "") {
//     alert("Please add an item");
//     return;
//   }
//   // Create list item
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(newItem));

//   const button = createButton("remove-item btn-link text-red");
//   li.appendChild(button);

//   itemList.appendChild(li);

//   checkUI()

//   itemInput.value = "";


// }

// function createButton(classes) {
//   const button = document.createElement("button");
//   button.className = classes;
//   const icon = createIcon("fa-solid fa-xmark");
//   button.appendChild(icon);
//   return button;
// }

// function createIcon(classes) {
//   const icon = document.createElement("i");
//   icon.className = classes;
//   return icon;
// }

// function deleteItem(e){
//    if(e.target.parentElement.classList.contains("remove-item")){
//     if(confirm("Are you sure?")){
//         e.target.parentElement.parentElement.remove();
//         checkUI()
   
//    }
// }

// function clearAll(){
//    while(itemList.firstChild){
//     itemList.removeChild(itemList.firstChild)
//    }
//    checkUI()
// }

// function checkUI(){
//     //everytime function runs, we are taking the item
//     const items = itemList.querySelectorAll("li")
//     if(items.length === 0){
//         clearBtn.style.display = "none"
//         itemFilter.style.display = "none"
//     }else{
//         clearBtn.style.display = "block"
//         itemFilter.style.display = "block"
//     }
// }

// itemForm.addEventListener("submit", addItem);
// itemList.addEventListener("click",deleteItem)
// clearBtn.addEventListener("click",clearAll)

// //when page loads
// checkUI()

// const itemForm = document.getElementById("item-form");
// const itemInput = document.getElementById("item-input");
// const itemList = document.getElementById("item-list");
// const ClearBtn = document.getElementById('clear')

// function addItem(e) {
//   e.preventDefault();

//   const newItem = itemInput.value;

//   //Validate Input
//   if (newItem === "") {
//     alert("Please add an item");
//     return;
//   }
//   // Create list item
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(newItem));

//   const button = createButton("remove-item btn-link text-red");
//   li.appendChild(button);

//   itemList.appendChild(li);

//   itemInput.value = "";
// }

// function createButton(classes) {
//   const button = document.createElement("button");
//   button.className = classes;
//   const icon = createIcon("fa-solid fa-xmark");
//   button.appendChild(icon);
//   return button;
// }

// function createIcon(classes) {
//   const icon = document.createElement("i");
//   icon.className = classes;
//   return icon;
// }

// function removeItem(e){
//     if(e.target.parentElement.classList.contains("remove-item")){
//         e.target.parentElement.parentElement.remove()
//     }
// }

// function clearItems(){
//     while(itemList.firstChild){
//         itemList.removeChild(itemList.firstChild)
//     }
// }

// itemForm.addEventListener("submit", addItem);
// itemList.addEventListener("click",removeItem);
// ClearBtn.addEventListener("click",clearItems)

// // with the lecture
// const itemForm = document.getElementById("item-form");
// const itemInput = document.getElementById("item-input");
// const itemList = document.getElementById("item-list");

// function addItem(e) {
//   e.preventDefault();

//   const newItem = itemInput.value;

//   //Validate Input
//   if (newItem === "") {
//     alert("Please add an item");
//     return;
//   }
//   // Create list item
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(newItem));

//   const button = createButton("remove-item btn-link text-red");
//   li.appendChild(button);

//   itemList.appendChild(li);

//   itemInput.value = "";
// }

// function createButton(classes) {
//   const button = document.createElement("button");
//   button.className = classes;
//   const icon = createIcon("fa-solid fa-xmark");
//   button.appendChild(icon);
//   return button;
// }

// function createIcon(classes) {
//   const icon = document.createElement("i");
//   icon.className = classes;
//   return icon;
// }

// itemForm.addEventListener("submit", addItem);

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
