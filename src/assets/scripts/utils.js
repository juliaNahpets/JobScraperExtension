function buttonExists(text) {
    return new Array(...document.querySelectorAll("button")).some(e => e.textContent.includes(text));
}