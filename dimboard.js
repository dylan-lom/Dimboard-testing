'use strict'

function getPins(url) {
    return fetch(url)
        .then(resp => {
            if (!resp.ok) throw new Error("HTTP error: " + resp.status)
            return resp.json()
        })
        .then(pins => pins.sort((a, b) => new Date(b.date) - new Date(a.date))) // Desc. order
        .catch(console.error)
}

function renderPins(pins) {
    const list = document.querySelector("ul#pins")
    if (!list) throw new Error("Element ul#pins not found!")
    const items = pins.map(pin => `<li><dim-pin href="${pin.href}" tags="${pin.tags?.join(',')}" date="${pin.date}">${pin.title}</dim-pin></li>`)
    list.innerHTML = items.join('\n')
}

function addEventListeners() {
    document.querySelector('#new-pin').addEventListener('click', ({target}) => {
        const n = document.querySelector('dim-new')
        if (n.style.display == 'none') {
            n.style.display = 'block'
            target.textContent = '-'
        } else {
            n.style.display = 'none'
            target.textContent = '+'
        }
    })
}

window.onload = () => {
    addEventListeners()
    getPins("pins.json").then(renderPins)
}
