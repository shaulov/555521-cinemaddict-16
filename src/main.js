import UserRateView from './view/user-rate-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SortView from './view/sort-view.js';
import ContentContainerView from './view/content-container-view.js';
import CardView from './view/card-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import StatisticView from './view/statictic-view.js';
import PopupContainerView from './view/popup-container-view.js';
import InfoPopupTopView from './view/info-popup-top-view.js';
import FilmDetailsTableView from './view/film-details-table-view.js';
import DetailGenreView from './view/detail-genre-view.js';
import InfoPopupBottomView from './view/info-popup-bottom-view.js';
import FilmCommentContainerView from './view/comment-container-view.js';
import FilmCommentView from './view/comment-view.js';
import NewCommentView from './view/new-comment-view.js';
import {render, RenderPosition} from './render.js';
import {isEscapeKey} from './ustil.js';
import {generateFilm, COMMENTS} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const FILM_COUNT_PER_STEP = 5;

const films = Array.from({length: 15}, generateFilm);
const filters = generateFilter(films);

const siteMain = document.querySelector('.main');
render(siteMain, new SiteMenuView(filters).element, RenderPosition.BEFOREEND);
render(siteMain, new SortView().element, RenderPosition.BEFOREEND);
render(siteMain, new ContentContainerView().element, RenderPosition.BEFOREEND);

const filmListContainer = siteMain.querySelector('.films-list__container');

const renderFilm = (filmListElement, film) => {
  const filmComponent = new CardView(film);
  const filmPopupComponent = new PopupContainerView();
  const infoPopupTopComponent = new InfoPopupTopView(film);
  const filmsDetailsTableComponent = new FilmDetailsTableView(film);
  const filmPopupBottomComponent = new InfoPopupBottomView();
  const filmCommentContainerComponent = new FilmCommentContainerView(COMMENTS[film.comments].length);
  const newCommentComponent = new NewCommentView();
  const filmComments = COMMENTS[film.comments];

  const openPopup = () => {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(filmPopupComponent.element);
  };

  const closePopup = () => {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(filmPopupComponent.element);
  };

  const onEscapeKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onEscapeKeydown);
    }
  };

  filmComponent.setClickHandler(() => {
    openPopup();
    document.addEventListener('keydown', onEscapeKeydown);
  });
  infoPopupTopComponent.setClickHandler(() => {
    closePopup();
    document.removeEventListener('keydown', onEscapeKeydown);
  });

  render(filmListElement, filmComponent.element, RenderPosition.BEFOREEND);
  render(filmPopupComponent.element, infoPopupTopComponent.element, RenderPosition.BEFOREEND);
  render(infoPopupTopComponent.element.querySelector('.film-details__film-description'), filmsDetailsTableComponent.element, RenderPosition.BEFOREBEGIN);
  render(filmsDetailsTableComponent.element, new DetailGenreView(film).element, RenderPosition.BEFOREEND);
  render(filmPopupComponent.element, filmPopupBottomComponent.element, RenderPosition.BEFOREEND);
  render(filmPopupBottomComponent.element, filmCommentContainerComponent.element, RenderPosition.BEFOREEND);

  for (let i = 0; i < filmComments.length; i++) {
    const filmCommentComponent = new FilmCommentView(filmComments[i]);
    render(filmCommentContainerComponent.element.querySelector('.film-details__comments-list'), filmCommentComponent.element, RenderPosition.BEFOREEND);
  }

  render(filmCommentContainerComponent.element, newCommentComponent.element, RenderPosition.BEFOREEND);
};

const siteHeader = document.querySelector('.header');
render(siteHeader, new UserRateView().element, RenderPosition.BEFOREEND);

const siteFooter = document.querySelector('.footer');
const footerStatistic = siteFooter.querySelector('.footer__statistics');
render(footerStatistic, new StatisticView().element, RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmListContainer, films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();
  render(filmListContainer, showMoreButtonComponent.element, RenderPosition.AFTEREND);

  showMoreButtonComponent.setClickHandler(() => {
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmListContainer, film));

    renderFilmCount += FILM_COUNT_PER_STEP;

    if(renderFilmCount >= films.length) {
      showMoreButtonComponent.element.remove();
      showMoreButtonComponent.removeElement();
    }
  });
}
