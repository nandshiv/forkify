import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was succesfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  /**
   * Constructor: sets up event handlers for showing/hiding the modal window.
   * @constructor
   * @this {AddRecipeView}
   */
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  /**
   * Toggles the visibility of the add recipe modal window.
   * @returns {void}
   */
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  /**
   * Adds event listener to show the modal window.
   * @returns {void}
   */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   * Adds event listener to hide the modal window.
   * @returns {void}
   */
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   * Adds event listener for uploading a new recipe.
   * @param {Function} handler - The handler function to call with form data.
   * @returns {void}
   */
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  /**
   * Generates the HTML markup for the add recipe form (currently empty).
   * @returns {string}
   */
  _generateMarkup() {}
}

export default new AddRecipeView();
