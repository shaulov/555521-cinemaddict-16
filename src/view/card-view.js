import {COMMENTS} from '../mock/film.js';

export const createCardTemplate = ({name, poster, rating, realiseDate, duration, description, genres, comments}) => {
  const visibleDescription = description.length > 140 ? `${description.slice(0, 139)}...` : description;

  return `
  <article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${realiseDate.slice(-4)}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${visibleDescription}</p>
      <span class="film-card__comments">${COMMENTS[comments].length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>
  `;
};
