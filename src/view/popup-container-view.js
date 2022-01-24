import AbstractView from './abstract-view.js';

const createPopupContainerTemplate = () => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    </form>
  </section>`
);

export default class PopupContainerView extends AbstractView {
  get template() {
    return createPopupContainerTemplate();
  }
}
