const { bgWhiteBright } = require('chalk')
const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger
    
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })    
        saveNotes(notes)
        console.log(chalk.green.inverse.bold("New note added!"))
    } else {
        console.log(chalk.red.inverse.bold("A note with this title already exists"))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0){
        console.log(chalk.red.inverse.bold("No note found"))
    } else {
        notes.pop({
            title: title
        })
        saveNotes(notes)
        console.log(chalk.green.inverse.bold("Note removed"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log("You have the following notes saved: ")
    notes.forEach(element => {
        console.log(chalk.white.inverse(element.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)
    if (foundNote){
        console.log(chalk.inverse(foundNote.body))
    } else {
        console.log('No note with this title exists')
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}