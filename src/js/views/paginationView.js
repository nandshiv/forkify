import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * Adds event listener for pagination button clicks.
   * @param {Function} handler - The handler function to call with the target page.
   * @returns {void}
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  /**
   * Generates the HTML markup for the pagination buttons.
   * @returns {string} The HTML markup string for pagination.
   */
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', currentPage);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', currentPage);
    }

    // Other pages
    if (currentPage < numPages) {
      return (
        this._generateMarkupButton('prev', currentPage) +
        this._generateMarkupButton('next', currentPage)
      );
    }

    // Page 1, no other pages
    return '';
  }

  /**
   * Generates the HTML markup for a single pagination button.
   * @param {string} type - The type of button ('prev' or 'next').
   * @param {number} currentPage - The current page number.
   * @returns {string} The HTML markup string for the button.
   */
  _generateMarkupButton(type, currentPage) {
    const goToPage = type === 'prev' ? currentPage - 1 : currentPage + 1;
    const arrow = type === 'prev' ? 'left' : 'right';
    const positionClass = `pagination__btn--${type}`;

    return `
      <button data-goto="${goToPage}" class="btn--inline ${positionClass}" data-goto="${goToPage}">
        ${
          type === 'prev'
            ? `
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${arrow}"></use>
          </svg>
          <span>Page ${goToPage}</span>
        `
            : `
          <span>Page ${goToPage}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${arrow}"></use>
          </svg>
        `
        }
      </button>
    `;
  }
}

export default new PaginationView();
