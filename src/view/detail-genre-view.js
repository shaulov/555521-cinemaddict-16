export const createDetailGenre = (genres) => {
  let fragment = '';
  genres.forEach((genre) => {
    fragment += `<span class="film-details__genre">${genre}</span>`;
  });
  return `
    <tr class="film-details__row">
      <td class="film-details__term">${genres.length === 1 ? 'Genre' : 'Genres'}</td>
      <td class="film-details__cell">
        ${fragment}
      </td>
    </tr>
  `;
};
