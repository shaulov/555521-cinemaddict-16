import {createElement} from '../render.js';

const createFilmComment = ({author, emoji, date, text}) => (
  `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
);

export default class FilmCommentView {
  #element = null;
  #commentInfo = null;

  constructor(commentInfo) {
    this.#commentInfo = commentInfo;
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmComment(this.#commentInfo);
  }

  removeElement() {
    this.#element = null;
  }
}
