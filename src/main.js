import UserRateView from './view/user-rate-view.js';
import SiteMenuView from './view/site-menu-view.js';
import SortView from './view/sort-view.js';
import FilmsContainerView from './view/films-container-view.js';
import FilmsListView from './view/films-list-view.js';
import FilmsListTitleView from './view/films-list-title-view.js';
import FilmsListContainerView from './view/films-list-container-view.js';
import CardView from './view/card-view.js';
import ShowMoreButtonView from './view/show-more-button-view.js';
import StatisticView from './view/statictic-view.js';
import PopupContainerView from './view/popup-container-view.js';
import InfoPopupTopView from './view/info-popup-top-view.js';
import FilmDetailsCloseView from './view/film-details-close-view.js';
import FilmDetailsWrapView from './view/film-details-wrap-view.js';
import FilmDetailsPosterView from './view/film-details-poster-view.js';
import FilmDetailsInfoView from './view/film-details-info-view.js';
import FilmDetailsDescriptionView from './view/film-details-description-view.js';
import FilmDetailsControlView from './view/film-details-control-view.js';
import FilmDetailsTableView from './view/film-details-table-view.js';
import DetailGenreView from './view/detail-genre-view.js';
import InfoPopupBottomView from './view/info-popup-bottom-view.js';
import FilmCommentContainerView from './view/comment-container-view.js';
import CommentListView from './view/comment-list-view.js';
import FilmCommentView from './view/comment-view.js';
import NewCommentView from './view/new-comment-view.js';
import {render, RenderPosition, remove} from './render.js';
import {openPopup, closePopup} from './popup.js';
import {isEscapeKey} from './ustil.js';
import {generateFilm, COMMENTS} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const FILM_COUNT_PER_STEP = 5;

const films = Array.from({length: 15}, generateFilm);
const filters = generateFilter(films);

const filmsContainerComponent = new FilmsContainerView();
const filmsListComponent = new FilmsListView();
const filmListContainerComponent = new FilmsListContainerView();

const siteMain = document.querySelector('.main');
render(siteMain, new SiteMenuView(filters), RenderPosition.BEFOREEND);
render(siteMain, new SortView(), RenderPosition.BEFOREEND);
render(siteMain, filmsContainerComponent, RenderPosition.BEFOREEND);
render(filmsContainerComponent, filmsListComponent, RenderPosition.BEFOREEND);
render(filmsListComponent, new FilmsListTitleView(), RenderPosition.BEFOREEND);
render(filmsListComponent, filmListContainerComponent, RenderPosition.BEFOREEND);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new CardView(film);
  const filmPopupComponent = new PopupContainerView();
  const infoPopupTopComponent = new InfoPopupTopView(film);
  const filmDetailsCloseComponent = new FilmDetailsCloseView();
  const filmDetailsWrapComponent = new FilmDetailsWrapView();
  const filmDetailsInfoComponent = new FilmDetailsInfoView(film);
  const filmsDetailsTableComponent = new FilmDetailsTableView(film);
  const filmPopupBottomComponent = new InfoPopupBottomView();
  const filmCommentContainerComponent = new FilmCommentContainerView(COMMENTS[film.comments].length);
  const commentListComponent = new CommentListView();
  const newCommentComponent = new NewCommentView();
  const filmComments = COMMENTS[film.comments];

  const onEscapeKeydown = (evt) => {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup(filmPopupComponent);
      document.removeEventListener('keydown', onEscapeKeydown);
    }
  };

  filmComponent.setClickHandler(() => {
    openPopup(filmPopupComponent);
    document.addEventListener('keydown', onEscapeKeydown);
  });
  filmDetailsCloseComponent.setClickHandler(() => {
    closePopup(filmPopupComponent);
    document.removeEventListener('keydown', onEscapeKeydown);
  });

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
  render(filmPopupComponent, infoPopupTopComponent, RenderPosition.BEFOREEND);
  render(infoPopupTopComponent, filmDetailsCloseComponent, RenderPosition.AFTERBEGIN);
  render(infoPopupTopComponent, filmDetailsWrapComponent, RenderPosition.BEFOREEND);
  render(filmDetailsWrapComponent, new FilmDetailsPosterView(film), RenderPosition.BEFOREEND);
  render(filmDetailsWrapComponent, filmDetailsInfoComponent, RenderPosition.BEFOREEND);
  render(filmDetailsInfoComponent, filmsDetailsTableComponent, RenderPosition.BEFOREEND);
  render(filmDetailsInfoComponent, new FilmDetailsDescriptionView(film), RenderPosition.BEFOREEND);
  render(infoPopupTopComponent, new FilmDetailsControlView(), RenderPosition.BEFOREEND);
  render(filmsDetailsTableComponent, new DetailGenreView(film), RenderPosition.BEFOREEND);
  render(filmPopupComponent, filmPopupBottomComponent, RenderPosition.BEFOREEND);
  render(filmPopupBottomComponent, filmCommentContainerComponent, RenderPosition.BEFOREEND);
  render(filmCommentContainerComponent, commentListComponent, RenderPosition.BEFOREEND);

  for (let i = 0; i < filmComments.length; i++) {
    const filmCommentComponent = new FilmCommentView(filmComments[i]);
    render(commentListComponent, filmCommentComponent, RenderPosition.BEFOREEND);
  }

  render(filmCommentContainerComponent, newCommentComponent, RenderPosition.BEFOREEND);
};

const siteHeader = document.querySelector('.header');
render(siteHeader, new UserRateView(), RenderPosition.BEFOREEND);

const siteFooter = document.querySelector('.footer');
const footerStatistic = siteFooter.querySelector('.footer__statistics');
render(footerStatistic, new StatisticView(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmListContainerComponent, films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();
  render(filmListContainerComponent, showMoreButtonComponent, RenderPosition.AFTEREND);

  showMoreButtonComponent.setClickHandler(() => {
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmListContainerComponent, film));

    renderFilmCount += FILM_COUNT_PER_STEP;

    if(renderFilmCount >= films.length) {
      remove(showMoreButtonComponent);
      showMoreButtonComponent.removeElement();
    }
  });
}
