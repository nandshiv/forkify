import icons from 'url:../../img/icons.svg';

/**
 * Base view class for rendering and updating UI components.
 * @class
 */
export default class View {
  _data;

  /**
   * Renders the received data to the DOM.
   * @param {*} data - The data to be rendered (e.g. recipe, results).
   * @param {boolean} [render=true] - If false, returns markup string instead of rendering to the DOM.
   * @returns {undefined|string} Undefined if rendering, markup string if not.
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Updates only changed elements in the DOM.
   * @param {*} data - The new data to update the DOM with.
   * @returns {void}
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT
      const newText = newEl.firstChild?.nodeValue;
      if (
        !newEl.isEqualNode(curEl) &&
        typeof newText === 'string' &&
        newText.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  /**
   * Clears the parent element's HTML.
   * @returns {void}
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Renders a loading spinner to the parent element.
   * @returns {void}
   */
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Renders an error message to the parent element.
   * @param {string} [message=this._errorMessage] - The error message to render.
   * @returns {void}
   */
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Renders a success/info message to the parent element.
   * @param {string} [message=this._message] - The message to render.
   * @returns {void}
   */
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
