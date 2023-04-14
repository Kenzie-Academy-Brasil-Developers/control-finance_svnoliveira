import { valuesCategory, insertedValues } from "./valuesData.js"
import { numberDotToComma, updateSum } from "./engine.js";


export const renderEntries = (list) => {
    const cardsContainer = document.querySelector('#transactions > ul');
    cardsContainer.innerHTML = '';

    list.forEach(data =>{
        const card = document.createElement('li');
        const value = document.createElement('span');
        const buttonContainer = document.createElement('div');
        const categoryDisplay = document.createElement('button');
        const removeButton = document.createElement('img');

        card.classList.add('transactions__card');
        value.classList.add('tittle--medium');
        categoryDisplay.classList.add('button','button-greylow','text--small');
        removeButton.classList.add('button__remove-entry','button');
        removeButton.src = './src/assets/trash.svg';
        removeButton.alt = 'recycle bin';
        
        removeButton.dataset.entryID = data.id;
        value.innerText = `R$ ${numberDotToComma(data.value.toFixed(2))}`;
        categoryDisplay.innerText = `${valuesCategory[data.categoryID]}`;

        removeButton.addEventListener('click', () => {
            const entryID = removeButton.dataset.entryID;
            insertedValues.forEach(entry => {
                let entryIndex = insertedValues.indexOf(entry);
                if (entry.id == entryID){
                    insertedValues.splice(entryIndex, 1);
                    card.remove();
                    updateSum();
                    return;
                }
            });
        })

        cardsContainer.appendChild(card);
        card.appendChild(value);
        card.appendChild(buttonContainer);
        buttonContainer.appendChild(categoryDisplay);
        buttonContainer.appendChild(removeButton);
    }) 
}