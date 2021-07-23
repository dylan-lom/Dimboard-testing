'use strict'

class DimPin extends HTMLElement {
    a = document.createElement('a')
    details = {
        tags: [],
        date: new Date(1990, 1, 1)
    }

    constructor() {
        super()

        this.a.target = '_blank'
        this.a.textContent = this.textContent
        this.textContent = ''
        this.a.href = this.getAttribute('href')
        this.details.tags = this.getAttribute('tags')?.split(',')
        this.details.date = new Date(this.getAttribute('date'))

        this.appendChild(this.a)
    }
}

customElements.define('dim-pin', DimPin)

