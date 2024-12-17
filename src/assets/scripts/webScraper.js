async function webScraper(scraper) {
    let messageContainer = document.querySelector(".js-extension__message_container")
    if(!messageContainer){
        messageContainer = document.createElement("div");
        messageContainer.className = "js-extension__message_container";
        const container = document.querySelector(".js-extension__content_container");
        container.insertBefore(messageContainer, container.firstChild)
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/${scraper}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jobData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        json.messages.forEach((msg, index) => {
            setTimeout(() => {
            const { message, status } = getMessageAndStatus(msg);
            showMessage(message, status, messageContainer);
            }, index * 1000);
        })
    } catch (error) {
        console.error("Error sending data:", error);
        showMessage("Error sending data.", "error", messageContainer);
    }
}

function showMessage(message, status, messageContainer) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.className = `js-extension__message ${status}`;
    messageContainer.appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

function getMessageAndStatus(message) {
    const statusMap = {
        40: { message: message["msg"], status: "error" },
        30: { message: "Data entry already exists", status: "warning" },
        25: { message: message["msg"], status: "success" },
        10: { message: message["msg"], status: "debug" }
    };

    return statusMap[message["lvl"]] || { message: "Unknown status", status: "info" };
}