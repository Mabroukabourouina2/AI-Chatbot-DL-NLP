document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('chatboxMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Function to display the welcome message
    function displayWelcomeMessage() {
        const welcomeMessage = "Hi, I'm Finlogik Chat! How can I help you?";
        displayMessage(welcomeMessage, 'bot'); // Display as bot message
    }

    // Call the function to display the welcome message on load
    displayWelcomeMessage();

    sendButton.addEventListener('click', () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            userInput.value = '';

            // Send user message to the backend
            fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            })
            .then(response => response.json())
            .then(data => {
                // Display the bot response received from the backend
                displayMessage(data.answer, 'bot'); // Use 'data.answer' here
            })
            .catch(error => {
                console.error('Error:', error);
                displayMessage('Sorry, something went wrong.', 'bot');
            });
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);

        // Create a container for the message and the avatar
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        // Add an image for the bot response
        if (sender === 'bot') {
            const avatar = document.createElement('img');
            avatar.src = 'images/robot.jpg'; // Replace with the path to your image
            avatar.alt = 'Chatbot Avatar';
            avatar.classList.add('avatar');
            messageContent.appendChild(avatar);
        }

        // Add the message text
        const textNode = document.createTextNode(message);
        messageContent.appendChild(textNode);
        messageElement.appendChild(messageContent);

        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to bottom
    }
});
