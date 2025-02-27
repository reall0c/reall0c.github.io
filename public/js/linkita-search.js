"use strict";
(function () {
  let searchFiles;
  let mySearchIndex;

  function toggleSearch() {
    const searchWrapperEl = document.getElementById("linkita-search-wrapper");
    const searchResultsEl = document.getElementById("linkita-search-results");
    if (null == searchWrapperEl || null == searchResultsEl) {
      console.error("searchWrapper is null");
      return;
    } else {
      searchWrapperEl.classList.remove("hidden");
    }

    const q = prompt("Enter your search term");
    if (null == q) {
      searchWrapperEl.classList.add("hidden");
      return;
    }

    if ("undefined" === typeof (searchIndex) && "undefined" === typeof (elasticlunr)) {
      searchResultsEl.innerHTML = "<li>Search: Please wait...</li>";
      Promise.all(searchFiles.map(loadScript))
        .catch(error => {
          showError(searchResultsEl, "<li>Search file not found: <code>" + error + "</code></li>");
        })
        .then((t) => {
          mySearchIndex = elasticlunr.Index.load(window.searchIndex);
          doSearch(q, searchResultsEl);
        });
    } else {
      doSearch(q, searchResultsEl);
    }
  }

  function doSearch(q, searchResultsEl) {
    const searchResults = mySearchIndex.search(q);
    const searchResultsCount = searchResults.length;
    if (searchResultsCount > 0) {
      const searchResultsRows = ["<li><strong>" + searchResultsCount + "</strong> search " +
        (searchResultsCount === 1 ? "result" : "results") + " for <code>" + mySafe(q) + "</code>:</li>"];
      for (let i = 0; i < searchResultsCount; i++) {
        const searchResult = searchResults[i];
        searchResultsRows.push("<li><a href=\"" + mySafe(searchResult.ref) + "\">" +
          mySafe(searchResult.doc.title) + "</a></li>");
      }
      searchResultsEl.innerHTML = searchResultsRows.join("");
      searchResultsEl.scrollIntoViewIfNeeded();
    } else {
      showError(searchResultsEl, "<li>No search results for <code>" + mySafe(q) + "</code>.</li>");
    }
  }

  function showError(searchResultsEl, err) {
    searchResultsEl.innerHTML = err;
    searchResultsEl.scrollIntoViewIfNeeded();
  }

  function mySafe(code) {
    return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").
      replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function loadScript(fileName) {
    return new Promise((resolve, reject) => {
      const scriptEl = document.createElement("script");
      scriptEl.onload = () => resolve(fileName);
      scriptEl.onerror = () => reject(fileName);
      scriptEl.async = true;
      scriptEl.src = fileName;
      document.head.appendChild(scriptEl);
    });
  }

  function initSearchButton({scripts}) {
    searchFiles = scripts;
  }

  if (null == window.linkita) window.linkita = {};
  window.linkita.toggleSearch = toggleSearch;
  window.linkita.initSearchButton = initSearchButton;
})();
