import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/actual';
import 'regenerator-runtime/runtime';

if (import.meta.hot) {
  import.meta.hot.accept();
}

/**
 * Controls loading and rendering of recipes based on the URL hash.
 * @returns {Promise<void>} A promise that resolves when the recipe is loaded and rendered.
 */
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //0: update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1. Load recipe
    await model.loadRecipe(id);

    // 2. Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

/**
 * Controls loading and rendering of search results.
 * @returns {Promise<void>} A promise that resolves when the search results are loaded and rendered.
 */
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2. Load search results
    await model.loadSearchResults(query);
    // 3. Render first page of results
    resultsView.render(model.getSearchResultsPage(1));
    // 4. Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError('Failed to load search results. Please try again.');
  }
};

/**
 * Controls pagination of search results.
 * @param {number} goToPage - The page number to go to.
 * @returns {void}
 */
const controlPagination = function (goToPage) {
  // 1. Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Render new pagination buttons
  paginationView.render(model.state.search);
};

/**
 * Controls updating the number of servings in the recipe.
 * @param {number} newServings - The new number of servings.
 * @returns {void}
 */
const controlServings = function (newServings) {
  //Update the recipe servings(in state)
  model.updateServings(newServings);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

/**
 * Controls adding or removing a bookmark for the current recipe.
 * @returns {void}
 */
const controlAddBookmark = function () {
  //1. Add/remove a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //2. Update the recipe view
  recipeView.update(model.state.recipe);

  //3. Render Bookmarks
  bookmarksView.render(model.state.bookmarks);
};

/**
 * Controls rendering of bookmarks on page load.
 * @returns {void}
 */
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

/**
 * Controls uploading a new recipe from the form.
 * @param {Object} newRecipe - The new recipe data from the form.
 * @returns {Promise<void>} A promise that resolves when the recipe is uploaded and rendered.
 */
const controlAddRecipe = async function (newRecipe) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner();
    //upload the recipe
    await model.uploadRecipe(newRecipe);
    //render reciper
    recipeView.render(model.state.recipe);
    //Display success message
    addRecipeView.renderMessage();
    //Render Bookmark
    bookmarksView.render(model.state.bookmarks);
    //change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message || 'Failed to upload recipe.');
  }
};

/**
 * Initializes event handlers for the application.
 * @returns {void}
 * @this {undefined}
 */
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

/**
 * Clears all bookmarks from localStorage (for debugging).
 * @returns {void}
 */
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
