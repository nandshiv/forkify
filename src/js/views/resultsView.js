import View from './View';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _parentElement = document.querySelector('.results');

  /**
   * Generates the HTML markup for the search results.
   * @returns {string} The HTML markup string for all results.
   */
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
