import { valuesCategory, insertedValues } from "./valuesData.js"
import { renderEntries } from "./render.js";

// ----------- changes value format from 00.00 to 00,00 and vice versa ----------

export const numberDotToComma = (value) => {
    const original = value.toString();
    let result = '';
    for (let i = 0; i < original.length; i++) {
        let character = original[i];
        if (character == '.') {
            result += ',';
        } else {
            result += `${character}`
        }
    }
    return result;
}
export const numberCommaToDot = (value) => {
    const original = value.toString();
    let result = '';
    for (let i = 0; i < original.length; i++) {
        let character = original[i];
        if (character == ',') {
            result += '.';
        } else {
            result += `${character}`
        }
    }
    return result;
}

// -------------update the entries sum --------------------------------------------

export const updateSum = () => {
    let counter = 0;
    counter = insertedValues.reduce((acumulator, currentValue) => {
        if (currentValue.categoryID == 0){
            return acumulator + currentValue.value;
        } else if (currentValue.categoryID == 1){
            return acumulator - currentValue.value;
        }
    },0);
    
    const counterDisplay = document.querySelector('#app__balance-display > span');
    counter = counter.toFixed(2);
    counterDisplay.innerText = numberDotToComma(counter);
}

//----------------------------------filters---------------------------------------

const cleanFilters = (list) =>{
    list.forEach(button => {
        button.classList.remove('button--active');
    });
}

const fillList = (category) =>{
    let newList = [];
    insertedValues.map(entry => {
      if (category == 'Entradas' && entry.categoryID == 0){
        newList.push(entry);
      } else if (category == 'Saídas' && entry.categoryID == 1){
        newList.push(entry);
      }
    })
    return newList;
}

export const handleFilters = () => {
    let filteredList = [];
    const buttonList = document.querySelectorAll('#app__filter-buttons-container > button');

    buttonList.forEach(button => {
        button.addEventListener('click', () =>{
            cleanFilters(buttonList);
            button.classList.add('button--active');
            if (button.innerText == 'Todos'){
                filteredList = insertedValues;
            } else {
                filteredList = fillList(`${button.innerText}`);
            }
            renderEntries(filteredList);
        })
    });

}

//---------------------posting new entry ------------------------------

export const handleCategory = (list) =>{
    list.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            list[0].classList.remove('button--active');
            list[1].classList.remove('button--active');
            event.target.classList.add('button--active');
        })
    });
}

export const handleForm = () =>{
    const modalController = document.querySelector('#modal__controller');
    const newInput = document.querySelector('.value-input__container > input');
    const categoryButtons = document.querySelectorAll('.modal__type-selector__container > button');
    const sendButton = document.querySelector('#submit__button');
    
    handleCategory(categoryButtons);

    newInput.addEventListener('keyup', (event) => {
        if (event.key != '.') {
           if (event.key != ',') {
               if (isNaN(parseInt(event.key))){
                   newInput.value = '';
               }
           }
        } 
    })

    sendButton.addEventListener('click', (event) => {
        event.preventDefault();
        const newValue = numberCommaToDot(newInput.value);
        let newCategory = 3;
        if (categoryButtons[0].classList.contains('button--active')){
            newCategory = 0;
        } else if (categoryButtons[1].classList.contains('button--active')){
            newCategory = 1;
        }
        
        if (newInput === '' || newInput === 0) {
            alert('Por favor, coloque um valor acima de 0 para ser inserido')
        } else if (newCategory === 3) {
            alert('Por favor, marque o tipo do valor a ser inserido')
        } else {
            const newID = insertedValues[insertedValues.length-1].id ++;
            const newEntry = {
                id: newID,
                value: parseFloat(newValue),
                categoryID: newCategory,
            }
            insertedValues.push(newEntry);
            renderEntries(insertedValues);
            updateSum();
            modalController.close();
        }

    })
}
