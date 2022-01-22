import {createElement} from '../render.js';

const createFilmCommentContainer = (commentCount) => (
  `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>

    <ul class="film-details__comments-list">

    </ul>
  </section>`
);

export default class FilmCommentContainerView {
  #element = null;
  #commentCount = null;

  constructor(commentCount) {
    this.#commentCount = commentCount;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmCommentContainer(this.#commentCount);
  }

  removeElement() {
    this.#element = null;
  }
}
