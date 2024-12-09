let jobData = {
    "url": window.location.href,
}

const container = document.createElement("div");
container.className = "js-extension__container bottom";

const iconButton = document.createElement("button");
iconButton.className = "js-extension__icon";

const contentContainer = document.createElement("div");
contentContainer.className = "js-extension__content_container hidden animation";

iconButton.addEventListener("click", () => {
    contentContainer.classList.toggle("hidden");
});

const wrapper = document.createElement("div");
wrapper.className = "js-extension__wrapper";

const urlScraperButton = document.createElement("button");
urlScraperButton.innerText = "URL Scraper";

const contentScraperButton = document.createElement("button");
contentScraperButton.innerText = "Content Scraper";

urlScraperButton.addEventListener("click", () => {
    webScraper("url-scraper")
});

contentScraperButton.addEventListener("click", () => {
    jobData["content"] = document.documentElement.outerHTML.toString();
    webScraper("content-scraper")
});


wrapper.append(urlScraperButton, contentScraperButton);
contentContainer.appendChild(wrapper);

container.append(iconButton, contentContainer);


document.body.appendChild(container);