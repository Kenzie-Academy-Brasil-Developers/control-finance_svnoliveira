export const handleModal = () => {
    const modalController = document.querySelector('#modal__controller');
    const button = document.querySelector('#button__new-entry');
    const closeButton = document.querySelector('#modal__container > header > button');
    const cancelButton = document.querySelector('.modal__button-cancel');

    button.addEventListener('click', () => {
        modalController.showModal();
    })
    closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        modalController.close();
    })
    cancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        modalController.close();
    })
}