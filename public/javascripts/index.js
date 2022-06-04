const addClickListener = (selector, func) => {
    let selected = document.querySelector(selector)
    selected.addEventListener("click", func)
}

const activateButtons = () => {
    for (let button of document.querySelectorAll('.tts-button')) {
        button.className = 'tts-button-active'
    }
    addClickListener("#copy-button", copyOutput)
    addClickListener("#download-button", downloadOutput)
    addClickListener("#play-button", playOutput)
}

const deactivateButtons = () => {
    for (let button of document.querySelectorAll('.tts-button-active')) {
        button.className = 'tts-button'
    }
    document.querySelector("#copy-button").removeEventListener("click", copyOutput)
    document.querySelector("#download-button").removeEventListener("click", downloadOutput)
    document.querySelector("#play-button").removeEventListener("click", playOutput)
}

const requestTTS = async (event, phrase) => {
    event.preventDefault()
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
            let outputContainer = document.querySelector("#output-container")
            outputContainer.innerHTML = `<span class="translation-text">${data.translation}</span>`
            requestTTS(event, data.translation)
            activateButtons()
        })
}

const clearTextInput = (event) => {
    event.preventDefault();
    let textInput = document.querySelector("#transl-input")
    let textOutput = document.querySelector("#output-container")
    textInput.value = ""
    textOutput.innerHTML = ""
    deactivateButtons()
}

const downloadOutput = (event) => {
    event.preventDefault()
    window.location.href = "/audio/speechOutput.wav";
}

const playOutput = (event) => {
    event.preventDefault()
    let audio = new Audio("/audio/speechOutput.wav")
    audio.play()
}

const copyOutput = (event) => {
    event.preventDefault()
    let output = document.querySelector("#output-container").textContent
    navigator.clipboard.writeText(output);
}

window.onload = async function () {
    addClickListener("#transl-button", requestTranslate)
    addClickListener(".clear-input", clearTextInput)
    let translInput = document.querySelector("#transl-input")
    translInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            requestTranslate(e)
        }
    })
}
