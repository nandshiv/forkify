class SearchView {
  _parentEl = document.querySelector('.search');

  /**
   * Gets the search query from the input field and clears the input.
   * @returns {string} The search query string.
   */
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  /**
   * Clears the search input field.
   * @returns {void}
   */
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  /**
   * Adds event listener for search form submission.
   * @param {Function} handler - The handler function to call on submit.
   * @returns {void}
   */
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
