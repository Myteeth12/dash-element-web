
function el(id){
    let element = document.getElementById(id);
    return element;
}
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


//Text to HTML function
function textToHtml(stringList){
    let totalElement = 0;
    let overAllElem = [];
    stringList.map((item, index) => {
        try {
            if(item.includes("/element=")){
                let elementType = item.replace("/element=", '');
                if(stringList[index + 1].includes('/value')){
                    let valueString = '';
                    let idValue = '';
                    let nestValue = '';
                    //For nesting elements
                    let rid1 = stringList[index + 1].split(' ');
                    if(rid1.length > 1){
                        if(rid1.length === 2){
                            if(rid1[1].includes('id=')){
                                let rid2 = rid1[1].replace('id=', '');
                                idValue = rid2;
                            } else if(rid1[1].includes('nest=')){
                                let rid2 = rid1[1].replace('nest=', '');
                                nestValue = rid2;
                            };
                        } else if(rid1.length === 3){
                            if(rid1[1].includes('id=')){
                                let rid2 = rid1[1].replace('id=', '');
                                let rid3 = rid1[2].replace('nest=', '');
                                idValue = rid2;
                                nestValue = rid3;
                            } else if(rid1[1].includes('nest=')){
                                let rid2 = rid1[2].replace('id=', '');
                                let rid3 = rid1[1].replace('nest=', '');
                                idValue = rid2;
                                nestValue = rid3;
                            };
                        }
                    };
                    for(let xe = index + 2; xe < stringList.length; xe++){
                        if(stringList[xe].includes('-end-')){
                            break;
                        } else {
                            if(stringList[xe + 1] === '-end-'){
                                valueString = valueString + stringList[xe];
                            } else {
                                valueString = valueString + stringList[xe] + '<br>';
                            }
                        }
                    };
                    console.log(`Element: <${elementType}>, \n${valueString}`);
                    if(idValue.trim() !== '' && nestValue.trim() === ''){
                        overAllElem.push({ 'element':elementType, 'value':valueString, 'id':idValue });
                    } else if(idValue.trim() === '' && nestValue.trim() !== ''){
                        overAllElem.push({ 'element':elementType, 'value':valueString, 'nest':nestValue });
                    } else if(idValue.trim() !== '' && nestValue.trim() !== ''){
                        overAllElem.push({ 'element':elementType, 'value':valueString, 'id':idValue, 'nest':nestValue });
                    } else {
                        overAllElem.push({ 'element':elementType, 'value':valueString });
                    }
                    totalElement += 1;
                } else {
                    console.error(`Invalid element: No value detected!`);
                };
            }
        } catch(error){
            console.error(`Invalid element: ${error}`);
        }
    });
    console.log(`Total element found ${totalElement}.`);
    main_elements = overAllElem;
};

//Json to HTML
function jsonHTML(){
    preview.innerHTML = "";
    main_elements.map((item) => {
        let elem = document.createElement(item.element);
        elem.innerHTML = item.value;
        if(item.id !== undefined){
            if(item.id.trim() !== ''){
                elem.setAttribute("id", item.id);
            }
        };
        if(item.nest !== undefined){
            try {
                if(item.nest.trim() !== ''){
                    const motherElement = el(item.nest);
                    motherElement.append(elem);
                };
            } catch (error) {
                console.error('Make sure to put the nest element below the element with that specified id');
            }
        } else {
            preview.append(elem);
        };
    });
};


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
    textToHtml(editorValue);
    jsonHTML();
});


//Preload savedtext
if(localStorage.getItem('savedtext') !== null){
    editor.value = localStorage.getItem('savedtext');
}