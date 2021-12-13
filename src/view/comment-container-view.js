export const createFilmCommentContainer = (commentCount) => (`
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>

    <ul class="film-details__comments-list">

    </ul>
  </section>
`);
