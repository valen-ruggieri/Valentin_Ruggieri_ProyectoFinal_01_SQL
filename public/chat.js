
const socket = io()


const divMessages = document.querySelector("#messagesBox");
const inputAutor = document.querySelector("#autorEmail");
const inputText = document.querySelector("#message");
const submit = document.querySelector("#submit");



 const validationAutor = document.getElementById("validationAutor");
 const validationMessage = document.getElementById("validationMessage");



 inputAutor.addEventListener("keydown", () => {
   if (inputAutor.value.length >= 6) {
     inputAutor.setAttribute(
       "class",
       `border border-success border-2 form-control btn bg-dark text-white bg-opacity-10`
     );
     validationAutor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2-circle text-success" viewBox="0 0 16 16">
     <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
     <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
   </svg>`;

     if (inputText.value.length >= 4) {
      submit.setAttribute('class','  btn btn-primary  ms-5 ')

       submit.removeAttribute("disabled");
     

     }
   } else if (inputAutor.value.length < 6 && inputAutor.value.length > 0) {
     inputAutor.setAttribute(
       "class",
       `border border-danger border-2 form-control btn bg-dark text-white bg-opacity-10`
     );
     validationAutor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
     <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
   </svg>`;
     submit.setAttribute("disabled", "");
     submit.setAttribute('class',' btn btn-secondary ms-5')
   } else {
     inputAutor.setAttribute("class", `form-control btn bg-secondary text-white bg-opacity-10`);
     validationAutor.textContent = " ";
     submit.setAttribute("disabled", "");
     submit.setAttribute('class',' btn btn-secondary ms-5')

   }
 });

 inputText.addEventListener("keydown", () => {
   if (inputText.value.length >= 4) {
     inputText.setAttribute(
       "class",
       `border border-success border-2 form-control btn bg-dark text-white bg-opacity-10`
     );
     validationMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2-circle text-success" viewBox="0 0 16 16">
     <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
     <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
   </svg>`;
     if (inputAutor.value.length >= 6) {
      submit.setAttribute('class','  btn btn-primary  ms-5 ')

       submit.removeAttribute("disabled");
  

     }
   } else if (inputText.value.length < 4 && inputText.value.length > 0) {
     inputText.setAttribute(
       "class",
       `border border-danger border-2 form-control btn bg-dark text-white bg-opacity-10`
     );
     validationMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
     <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
   </svg>`;
     submit.setAttribute("disabled", "");
     submit.setAttribute('class',' btn btn-secondary ms-5')

   } else {
     inputText.setAttribute("class", `form-control btn bg-secondary text-white bg-opacity-10`);
     validationMessage.textContent = " ";
     submit.setAttribute("disabled", "");
     submit.setAttribute('class',' btn btn-secondary ms-5')

   }
 });

 submit.addEventListener("click", (event) => {
   event.preventDefault();
   if (inputAutor.value.length >= 6 && inputText.value.length >= 4) {
     inputText.setAttribute("class", `form-control btn bg-secondary text-white bg-opacity-10`);
     inputAutor.setAttribute("class", `form-control btn bg-secondary text-white bg-opacity-10`);
     validationMessage.textContent = " ";
     validationAutor.textContent = " ";

     const date = new Date();
     const dateNow = ` ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
     const message = {
       autor: inputAutor.value,
       date: dateNow,
       text: inputText.value,
     };
     socket.emit("newMessage", message);
     inputAutor.value = "";
     inputText.value = "";
     submit.setAttribute("disabled", "");
   }
 });



 const deleteChatButton = document.querySelector("#deleteChat");


 socket.on("messages", (messages) => {
   if (messages.length > 0) {
     deleteChatButton.setAttribute(
       "class",
       "w-25 text-decoration-none badge bg-danger"
     );
     divMessages.setAttribute(
       "class",
       "bg-opacity-10 bg-secondary text-start mb-3 pt-3 w-75 ms-2 "
     );
     socket.emit("messages", messages);
   } else if (messages.length == 0) {
     deleteChatButton.setAttribute("class", "d-none");
     divMessages.setAttribute("class", "d-none");
     socket.emit("messages", messages);
   }
 });

 deleteChatButton.addEventListener("click", () => {
   socket.emit("deleteChat");
 });


 socket.on("messages", (messages) => {
   
     divMessages.innerHTML = messages
       .map((message) => {
         return `<div><p class="badge bg-dark bg-opacity-50  rounded-pill fs-6 " > 
                       <small class="text-danger  fs-6 ms-3">${message.autor} : 
                       <small class="text-light text-opacity-25 ms-1 fs-6">${message.text}</small>
                       <small class="badge bg-light text-dark bg-gradient bg-opacity-10 rounded-pill ms-4 ">${message.date}</small> 
                       </small> 
                       </p>
                 </div>`;
       })
       .join("");
   }
 );


