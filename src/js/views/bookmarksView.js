import View from './View';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _errorMessage = 'No bookmarks yet, Find a nice recipe and bookmark it ;)';
  _message = '';

  _parentElement = document.querySelector('.bookmarks__list');

  /**
   * Adds event listener for rendering bookmarks on page load.
   * @param {Function} handler - The handler function to call on load.
   * @returns {void}
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Generates the HTML markup for the bookmarks list.
   * @returns {string} The HTML markup string for all bookmarks.
   */
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
