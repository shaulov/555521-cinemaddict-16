import AbstractView from './abstract-view.js';

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

export default class DetailGenreView extends AbstractView{
  #genres = null;

  constructor (genres) {
    super();
    this.#genres = genres;
  }

  get template() {
    return createDetailGenre(this.#genres);
  }
}
