import AbstractView from './view/abstract-view.js';

export const openPopup = (popup) => {
  const filmPopup = popup instanceof AbstractView ? popup.element : popup;
  document.body.classList.add('hide-overflow');
  document.body.appendChild(filmPopup);
};

export const closePopup = (popup) => {
  const filmPopup = popup instanceof AbstractView ? popup.element : popup;
  document.body.classList.remove('hide-overflow');
  document.body.removeChild(filmPopup);
};
