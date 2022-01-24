import AbstractView from './abstract-view.js';

const createInfoPopupBottomTemplate = () => (
  `<div class="film-details__bottom-container">
  </div>`
);

export default class InfoPopupBottomView extends AbstractView {
  get template() {
    return createInfoPopupBottomTemplate();
  }
}
