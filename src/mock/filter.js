const filmToFilterMap = {
  all: (films) => films.length,
  watchlist: (films) => films
    .filter((film) => !film.isHistory)
    .filter((film) => film.isWatchlist).length,
  history: (films) => films.filter((film) => film.isHistory).length,
  favorite: (films) => films.filter((film) => film.isFavorite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  })
);
