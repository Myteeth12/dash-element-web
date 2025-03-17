
export function el(id){
    let element = document.getElementById(id);
    return element;
}
//Text to Json
export function textToHtml(stringList){
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
    return [totalElement, overAllElem];
};

//Text to class ( For handling style )
export function dashStyle(stringList){
    stringList.map((item) => {
        if(item.includes('/style')){
            let extract1 = item.split(' ');
            let extract2 = extract1[0].replace('/style=', '');
            if(extract2.trim() !== ''){
                if(el(extract2.trim()) !== null){
                    let extract3 = extract1[1].split(',');
                    if(extract3.length > 0){
                        const refElement = el(extract2.trim());
                        refElement.className = extract3.join(' ');
                    } else {
                        console.error('No class detected.');
                    }
                } else {
                    console.error('Element does not exist!\nPlease try to put an id on the desired element or\nput the style below the referred element');
                };
            } else {
                console.error('No id found.');
            }
        }
    });
}

//Json to HTML
export function jsonHTML(elementList, previewId){
    const previewElement = el(previewId);
    previewElement.innerHTML = "";
    elementList.map((item) => {
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
            previewElement.append(elem);
        };
    });
};