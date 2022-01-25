import AbstractView from './abstract-view.js';

const createInfoPopupTopTemplate = () => (
  `<div class="film-details__top-container">
  </div>`
);

export default class InfoPopupTopView extends AbstractView{
  get template() {
    return createInfoPopupTopTemplate();
  }
}
