'use strict'

class DimNew extends HTMLElement {
    github = 'https://github.com/dylan-lom/Dimboard-testing'
    target = '_blank'

    form = document.createElement('form')
    title = document.createElement('input') // type = text
    href = document.createElement('input') // type = text
    date = document.createElement('input') // type = text, disabled = true
    tags = document.createElement('input') // type = text
    save = document.createElement('button')
    
    constructor() {
        super()

        this.github = this.getAttribute('github')
        if (this.getAttribute('target')) {
            this.target = this.getAttribute('target')
        }

        // expected expression, got keyword 'for'...
        const label = (fur) => {
            const l = document.createElement('label')
            l.for = fur
            l.textContent = fur + ': '
            return l
        }

        // TODO: This still seems stupid...
        const formRow = (...items) => {
            const div = document.createElement('div')
            div.classList.add('formRow')
            items.forEach(item => div.appendChild(item))
            return div
        }

        this.form.action = ''

        this.title.name = 'title'
        this.form.appendChild(formRow(label('title'), this.title))
        
        this.href.name = 'href'
        this.form.appendChild(formRow(label('href'), this.href))
        
        this.date.name = 'date'
        this.date.value = new Date().toISOString()
        this.date.disabled = true
        this.form.appendChild(formRow(label('date'), this.date))

        this.tags.name = 'tags'
        this.form.appendChild(formRow(label('tags'), this.tags))
        
        this.save.name = 'save'
        this.save.textContent = 'Save Pin'
        this.form.appendChild(formRow(label('save'), this.save))

        // FIXME: I feel like we shouldn't need to bind here... but then again
        // `this` still baffles me...
        this.form.addEventListener('submit', this.submit.bind(this))
        this.appendChild(this.form)
    }

    submit(ev) {
        ev.preventDefault()
        const title = encodeURIComponent('New Pin')
        const body = encodeURIComponent([
            `title: ${this.title.value}`,
            `href: ${this.href.value}`,
            `date: ${this.date.value}`,
            `tags: ${this.tags.value}`,
        ].join('\n'))
        window.open(`${this.github}/issues/new?title=${title}&body=${body}`,
                    this.target)
    }
}

customElements.define('dim-new', DimNew)

