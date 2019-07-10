const fs = require('fs')
const path = require('path')
const Helpers = use('Adonis/Src/Helpers')


class Base {
    constructor() {
    }

    /**
     * Ensures the command is executed within the project root.
     *
     * @method ensureInProjectRoot
     *
     * @return {void}
     *
     * @private
     */
    async _ensureInProjectRoot() {
        const acePath = path.join(process.cwd(), "ace")
        const exists = fs.existsSync(acePath)
        if (!exists) {
            throw new Error(
                "Oops! Make sure you are inside an Adonisjs app to run command."
            )
        }
    }

    /**
     * Prepends a line of text to a provided file.
     *
     * @param {String} Object.filename - Fully qualified path of the file to be operated on.
     * @param {Number} Object.lineNumber - Line to operate on.
     * @param {String} Object.lineContent - Content to be prepended.
     *
     * @return {Void}
     */
    async _prependLineToFile({filename, lineNumber, lineContent}) {
        let fileContents = fs.readFileSync(filename, 'utf-8')
        fileContents = fileContents.split("\n")
        if (fileContents[lineNumber] === lineContent) return
        fileContents.splice(lineNumber, 0, `${lineContent}`)
        fs.writeFileSync(filename, fileContents.join('\n'))
    }
}


module.exports = Base