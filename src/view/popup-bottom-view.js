import AbstractView from './abstract-view.js';

const createPopupBottomTemplate = () => (
  `<div class="film-details__bottom-container">

  </div>`
);

export default class InfoPopupBottomView extends AbstractView {
  get template() {
    return createPopupBottomTemplate();
  }
}
