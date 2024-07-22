const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<p>${message}</p>`;
    // if className == "outgoing" return left_value of ":" if true else right_value of ":"
        
    chatLi.innerHTML = chatContent;
    chatbox.scrollTo(0, chatbox.scrollHeight);
    return chatLi;
}

const getResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p")
    var server_data = { 'value': userMessage };
    // AJAX allows web pages to be updated asynchronously by exchanging data with a web server behind the scenes. 
    // This means that it is possible to update parts of a web page, without reloading the whole page.
    $.ajax({ 
        url: '/process', 
        type: 'POST', 
        contentType: 'application/json', 
        data: JSON.stringify(server_data),
        success: function(data) {
            console.log(data);
            messageElement.textContent = data.response
        }
    });
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    
    // if chat input is empty return none
    if(!userMessage) return;

    // if chat input is not empty, run create_chat_list_item function with 2 assigned arguments
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));

    chatbox.scrollTo(0, chatbox.scrollHeight);

    chatInput.value = ''
    setTimeout(
        () => {
            // Display "Thinking..." message while waiting for Response 
            const incomingChatLi = createChatLi("Thinking...","incoming")
            chatbox.appendChild(incomingChatLi);
            getResponse(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }
        ,600
    )

}

// if click the send_chat_button, run function handle_chat 
sendChatBtn.addEventListener("click",handleChat)

// Execute a function when the user presses a key on the keyboard
chatInput.addEventListener("keypress", function(event) {
    // If the user presses the "Shift + Enter" key on the keyboard
    if (event.shiftKey && event.key === "Enter") {
        // pass
      }
    // If the user presses the "Enter" key on the keyboard
    else if (!event.shiftKey && event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      sendChatBtn.click();
    }
  });