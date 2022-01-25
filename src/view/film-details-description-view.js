import AbstractView from './abstract-view.js';

const createFilmDetailsDescriptionTemplate = ({description}) => (
  `<p class="film-details__film-description">${description}</p>`
);

export default class FilmDetailsDescriptionView extends AbstractView{
  #description = null;

  constructor(description) {
    super();
    this.#description = description;
  }

  get template() {
    return createFilmDetailsDescriptionTemplate(this.#description);
  }
}
