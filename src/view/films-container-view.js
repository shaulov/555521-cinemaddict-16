import AbstractView from './abstract-view.js';

const createContentContainerTemplate = () => (
  `<section class="films">
  </section>
`);

export default class FilmsContainerView extends AbstractView {
  get template() {
    return createContentContainerTemplate();
  }
}
