import View from './View.js';
import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe, Please try another one!';
  _message = '';

  /**
   * Adds event listeners for rendering the recipe on hashchange and load.
   * @param {Function} handler - The handler function to call.
   * @returns {void}
   */
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  /**
   * Adds event listener for updating servings.
   * @param {Function} handler - The handler function to call with new servings.
   * @returns {void}
   */
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;

      const updateTo = +btn.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  /**
   * Adds event listener for adding/removing bookmarks.
   * @param {Function} handler - The handler function to call.
   * @returns {void}
   */
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  /**
   * Generates the HTML markup for the recipe view.
   * @returns {string} The HTML markup string.
   */
  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings - 1
            }">
              <svg><use href="${icons}#icon-minus-circle"></use></svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.servings + 1
            }">
              <svg><use href="${icons}#icon-plus-circle"></use></svg>
            </button>
          </div>
        </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
         
        <button class="btn--round btn--bookmark">
          <svg><use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use></svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${
          this._data.sourceUrl
        }" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
  }

  /**
   * Generates the HTML markup for a single ingredient.
   * @param {Object} ing - The ingredient object.
   * @returns {string} The HTML markup string for the ingredient.
   */
  _generateMarkupIngredient(ing) {
    const quantity = ing.quantity
      ? ing.quantity > 0.001 && ing.quantity < 100
        ? fracty(Math.round(ing.quantity * 1000) / 1000).toString()
        : ing.quantity.toFixed(2)
      : '';

    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${quantity}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>`;
  }
}

export default new RecipeView();
