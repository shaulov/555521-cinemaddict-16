import {createElement} from '../render.js';

const createDetailGenre = ({genres}) => {
  const fragment = document.createElement('div');
  genres.forEach((genre) => {
    fragment.append(`<span class="film-details__genre">${genre}</span>`);
  });

  return (
    `<tr class="film-details__row">
      <td class="film-details__term">${genres.length === 1 ? 'Genre' : 'Genres'}</td>
      <td class="film-details__cell">
        ${fragment.textContent}
      </td>
    </tr>`
  );
};

export default class DetailGenreView {
  #element = null;
  #genres = null;

  constructor (genres) {
    this.#genres = genres;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createDetailGenre(this.#genres);
  }

  removeElement() {
    this.#element = null;
  }
}
