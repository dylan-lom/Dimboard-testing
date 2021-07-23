'use strict'

class DimPin extends HTMLElement {
    // TODO: Investigate implications of using shadowRoot -- avoiding for now
    // due to potential (external) styling limitations.
    root = document.createElement('div')
    a = document.createElement('a') // child of root
    details = {
        tags: [],
        date: document.createElement('span')
    }

    constructor() {
        super()

        this.a.target = '_blank'
        this.a.textContent = this.textContent
        this.textContent = ''
        this.a.href = this.getAttribute('href')
        this.details.tags = this.getAttribute('tags')?.split(',')
        this.details.date.textContent = DimPin.FormatDate(new Date(this.getAttribute('date')))

        this.root.appendChild(this.a)
        this.root.appendChild(this.details.date)
        this.appendChild(this.root)
    }

    static FormatDate(date) {
        return ` (${date.toLocaleString().split(',')[0]})`
    }

    getTags() {
        return this.details.tags
    }
}

customElements.define('dim-pin', DimPin)

