const process = require('process')
const fs = require('fs')

String.prototype.partition = function(delimiter) {
    const [head, ...rest] = this.split(delimiter)
    return [head, rest.join(delimiter)]
}
const parseBody = (s) => {
    // sue me
    const body = s.split('\r\n')
        .map(ln => ln.partition(':'))
        .reduce((acc, [k, v]) => {
            acc[k.trim().toLowerCase()] = v.trim()
            return acc
        }, {})

    if (typeof body.title != 'string')
        throw new Error('string `title` is required')
    if (typeof body.href != 'string')
        throw new Error('string `href` is required')
    if (typeof body.date != 'string' || isNaN(Date.parse(body.date)))
        throw new Error('date `date` is required')

    if (!!body.tags)
        body.tags = body.tags.split(',').map(t => t.trim())

    return body
}

const pinsPath = `${process.cwd()}/${process.argv[2]}`
const pins = require(pinsPath)
const body = parseBody(process.argv[3])

pins.push(body)
fs.writeFile(pinsPath, JSON.stringify(pins), (err) => { if (err) throw err })

