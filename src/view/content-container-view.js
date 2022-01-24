import AbstractView from './abstract-view.js';

const createContentContainerTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
      </div>
    </section>
  </section>
`);

export default class ContentContainerView extends AbstractView {
  get template() {
    return createContentContainerTemplate();
  }
}
