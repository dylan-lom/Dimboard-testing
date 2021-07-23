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
    const items = pins.map(pin => `<li><dim-pin href="${pin.href}" tags="${pin.tags.join(',')}" date="${pin.date}">${pin.title}</dim-pin></li>`)
    list.innerHTML = items.join('\n')
}

window.onload = () => {
    if (!window.dimboard) window.dimboard = {}
    window.dimboard.pinsSrc = "pins.json"

    getPins(window.dimboard.pinsSrc).then(renderPins)
}
