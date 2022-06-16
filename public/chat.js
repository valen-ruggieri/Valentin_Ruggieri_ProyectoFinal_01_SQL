const socket = io();
const inputAutor = document.querySelector("#autorEmail");
const inputText = document.querySelector("#message");
const submit = document.querySelector("#submit");
const validationAutor = document.getElementById("validationAutor");
const validationMessage = document.getElementById("validationMessage");

inputAutor.addEventListener("keydown", () => {
  if (inputAutor.value.length >= 6) {
    inputAutor.setAttribute(
      "class",
      `border border-success border-2 inputChat`
    );
    validationAutor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2-circle text-success mb-1" viewBox="0 0 16 16">
     <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
     <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
   </svg>`;

    if (inputText.value.length > 4) {
      submit.setAttribute("class", " btn buttonSendMChat ");

      submit.removeAttribute("disabled");
    }
  } else if (inputAutor.value.length < 6 && inputAutor.value.length > 0) {
    inputAutor.setAttribute("class", `border border-danger border-2 inputChat`);
    validationAutor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle text-danger mb-1" viewBox="0 0 16 16">
     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
     <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
   </svg>`;
    submit.setAttribute("disabled", "");
    submit.setAttribute("class", " btn buttonSendDisabled");
  } else {
    inputAutor.setAttribute("class", `inputChat`);
    validationAutor.textContent = " ";
    submit.setAttribute("disabled", "");
    submit.setAttribute("class", " btn buttonSendDisabled");
  }
});

inputText.addEventListener("keydown", () => {
  if (inputText.value.length >= 4) {
    inputText.setAttribute("class", `border border-success border-2 inputChat`);
    validationMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check2-circle text-success mb-1" viewBox="0 0 16 16">
     <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
     <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
   </svg>`;
    if (inputAutor.value.length >= 6) {
      submit.setAttribute("class", " btn buttonSendMChat");

      submit.removeAttribute("disabled");
    }
  } else if (inputText.value.length < 4 && inputText.value.length > 0) {
    inputText.setAttribute("class", `border border-danger border-2 inputChat`);
    validationMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle text-danger mb-1" viewBox="0 0 16 16">
     <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
     <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
   </svg>`;
    submit.setAttribute("disabled", "");
    submit.setAttribute("class", " btn buttonSendDisabled");
  } else {
    inputText.setAttribute("class", `inputChat`);
    validationMessage.textContent = " ";
    submit.setAttribute("disabled", "");
    submit.setAttribute("class", "btn buttonSendDisabled");
  }
});

submit.addEventListener("dbclick", (event) => {
  if (inputAutor.value.length >= 6 && inputText.value.length >= 4) {
    inputText.setAttribute("class", `inputChat`);
    inputAutor.setAttribute("class", `inputChat`);
    validationMessage.textContent = " ";
    validationAutor.textContent = " ";
    inputText.value = "";
    submit.setAttribute("disabled", "");
    submit.setAttribute("class", "btn buttonSendDisabled");
  }
});
