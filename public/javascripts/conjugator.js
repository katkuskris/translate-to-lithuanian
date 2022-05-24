const requestConjugate = async (event) => {
    event.preventDefault()
    let verb = document.querySelector("#conj-input").value
    console.log("here is the phrase:", verb)
    await fetch(`/conjugator`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "verb": verb })
    })
        .then(response => response.json())
        .then(data => displayConj(data.verb));
}

const displayConj = (verb) => {
    outputContainer = document.querySelector("#output-container")
    outputContainer.append = `h1 My Site`
    console.log(test)
}

window.onload = async function () {
    let conjButton = document.querySelector("#conj-button")
    conjButton.addEventListener("click", requestConjugate)
    let conjInput = document.querySelector("#conj-input")
    conjInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            requestConjugate(e)
        }
    })
}