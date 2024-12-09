let jobData = {
    "url": window.location.href,
    "content": document.documentElement.outerHTML,
    "company_content": "",
}

const container = document.createElement("div");
container.className = "js-extension__container bottom";
container.setAttribute("draggable", true)

const iconButton = document.createElement("button");
iconButton.className = "js-extension__icon";

const contentContainer = document.createElement("div");
contentContainer.className = "js-extension__content_container hidden animation";

const wrapper = document.createElement("div");
wrapper.className = "js-extension__wrapper";

const contentScraperButton = document.createElement("button");
contentScraperButton.innerText = "Content Scraper";

iconButton.addEventListener("click", () => {
    contentContainer.classList.toggle("hidden");
});

contentScraperButton.addEventListener("click", async () => {
    try {
        const companyUrlElement = document.querySelector("div[data-company-name='true'] a");
        const companyUrl = companyUrlElement ? companyUrlElement.getAttribute("href") : null;

        if(companyUrl) {
            const response = await fetch(companyUrl);
            const data = await response.text();
            jobData["company_content"] = data;
        }

        const exists = buttonExists("mehr anzeigen");

        if(exists) {
            new Array(...document.querySelectorAll("button")).find(e => e.textContent.includes("mehr anzeigen")).click();
            jobData["content"] = document.documentElement.outerHTML;
        }
        webScraper("content-scraper");
    } catch(error){
        console.error("No company url found: ", error);
        webScraper("content-scraper")
    }
});

wrapper.append(contentScraperButton);
contentContainer.appendChild(wrapper);

container.append(iconButton, contentContainer);
document.body.appendChild(container);


