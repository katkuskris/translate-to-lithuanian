const requestTTS = async (event, phrase) => {
    event.preventDefault()
    console.log("here is the phrase:", phrase)
    await fetch(`/tts`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phrase: phrase })
    })
}


const requestTranslate = async (event) => {
    event.preventDefault()
    let phrase = document.querySelector("#transl-input").value
    await fetch(`/translator`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phrase: phrase })
    })
        .then(response => response.json())
        .then(data => {
            readyphrase = document.querySelector("#output-container")
            readyphrase.innerHTML = `<span class="translation-text">${data.translation}</span>`
            // requestTTS(event, data.translation)
        })
}

const clearTextInput = (event) => {
    event.preventDefault();
    let textInput = document.querySelector("#transl-input")
    let textOutput = document.querySelector("#output-container")
    textInput.value = ""
    textOutput.innerHTML = ""

}

window.onload = async function () {
    let translButton = document.querySelector("#transl-button")
    translButton.addEventListener("click", requestTranslate)
    let translInput = document.querySelector("#transl-input")
    translInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            requestTranslate(e)
        }
    })
    let clearInput = document.querySelector(".clear-input")
    clearInput.addEventListener("click", clearTextInput)
}
