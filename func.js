
import {  el, textToHtml, dashStyle, jsonHTML } from "../jsonhtml.js";

/*
    When adding an element to the main_elements variable
    you need to follow this structure to avoid errors lmao

    structure:
    [{ 'element':'h1', 'value':'WHat the hell' }]
*/

const preview = el('preview');
const editor = el('textEditor');
const reload = el('reloadView');
let main_elements = [];

let supported_elements = ['p', 'h1', 'h2', 'h3', 'div', 'button', 'textarea'];


//Text Editor Features
editor.addEventListener('keydown', function(event) {
    if (event.key === '{') {
        event.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '{}' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }

    if (event.key === '"' || event.key === "'") {
        event.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '""' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }

    if (event.key === 'Tab') {
        event.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
    }
});


//Save text typed
editor.addEventListener('input', (e) => {
    localStorage.setItem('savedtext', editor.value);
});
//Preview Button
reload.addEventListener('click', (e) => {
    let editorValue = editor.value.split("\n");
    main_elements = textToHtml(editorValue)[1];
    jsonHTML(main_elements, 'preview');
    dashStyle(editorValue);
});


//Preload savedtext
if(localStorage.getItem('savedtext') !== null){
    editor.value = localStorage.getItem('savedtext');
}

let editorValue = editor.value.split("\n");
if(textToHtml(editorValue)[0] > 0){
    main_elements = textToHtml(editorValue)[1];
    jsonHTML(main_elements, 'preview');
    dashStyle(editorValue);
}