import {  el, textToHtml, dashStyle, jsonHTML } from "../jsonhtml.js";

let jsonElements = [];

if(localStorage.getItem('savedtext') !== null){
    if(localStorage.getItem('savedtext').trim() !== ''){
        let codeText = localStorage.getItem('savedtext').split("\n");
        if(textToHtml(codeText)[0] > 0){
            jsonElements = textToHtml(codeText)[1];
            jsonHTML(jsonElements, 'fullElements');
            dashStyle(codeText);
        }
    }
};

console.log('test');
