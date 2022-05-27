/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLOSE": () => (/* binding */ CLOSE),
/* harmony export */   "CLOSE_PLUGIN_KEY": () => (/* binding */ CLOSE_PLUGIN_KEY),
/* harmony export */   "GET_ALL_REQUEST": () => (/* binding */ GET_ALL_REQUEST),
/* harmony export */   "GET_ALL_RESPONSE": () => (/* binding */ GET_ALL_RESPONSE),
/* harmony export */   "INSTRUCTIONS": () => (/* binding */ INSTRUCTIONS),
/* harmony export */   "NEXT_ELEMENT_KEY": () => (/* binding */ NEXT_ELEMENT_KEY),
/* harmony export */   "PREVIOUS_ELEMENT_KEY": () => (/* binding */ PREVIOUS_ELEMENT_KEY),
/* harmony export */   "READ_ALL_KEY": () => (/* binding */ READ_ALL_KEY),
/* harmony export */   "READ_ALL_REQUEST": () => (/* binding */ READ_ALL_REQUEST),
/* harmony export */   "READ_ALL_RESPONSE": () => (/* binding */ READ_ALL_RESPONSE),
/* harmony export */   "READ_SEPARATE_KEY": () => (/* binding */ READ_SEPARATE_KEY),
/* harmony export */   "WELCOME_MESSAGE": () => (/* binding */ WELCOME_MESSAGE)
/* harmony export */ });
const READ_ALL_REQUEST = 'read-all-request';
const GET_ALL_REQUEST = 'get-all-request';
const READ_ALL_RESPONSE = 'read-all-response';
const GET_ALL_RESPONSE = 'get-all-response';
const CLOSE = 'close';
const WELCOME_MESSAGE = 'Welcome to accessiblity plugin. Press A to read all the frames. Press B to start reading separate elements. Press Escape key to stop and close the plugin.';
const INSTRUCTIONS = 'Use closing square bracket to read next element and opening square bracket to read previous element.';
const READ_ALL_KEY = 'KeyA';
const READ_SEPARATE_KEY = 'KeyB';
const NEXT_ELEMENT_KEY = 'BracketRight';
const PREVIOUS_ELEMENT_KEY = 'BracketLeft';
const CLOSE_PLUGIN_KEY = 'Escape';


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ "./src/consts.ts");

figma.showUI(__html__);
figma.ui.onmessage = msg => {
    figma.skipInvisibleInstanceChildren = true;
    const frames = figma.currentPage
        .findAllWithCriteria({ types: ['FRAME'] })
        .filter(frame => frame.parent.type === 'PAGE')
        .filter(frame => frame.visible);
    const textToSpeech = [];
    frames.forEach(frame => {
        textToSpeech.push(frame.name);
        const textNodes = frame
            .findAllWithCriteria({ types: ['TEXT'] })
            .filter(node => node.visible)
            .sort((a, b) => Math.round(a.y) - Math.round(b.y))
            .sort((a, b) => Math.round(a.x) - Math.round(b.x));
        textNodes.forEach(n => console.log(n.characters, n.x, n.y));
        const texts = textNodes.map(node => {
            if (node.reactions.length !== 0 && node.reactions) {
                return `Button ${node.characters}`;
            }
            return node.characters;
        });
        textToSpeech.push(texts);
    });
    if (msg === _consts__WEBPACK_IMPORTED_MODULE_0__.READ_ALL_REQUEST) {
        figma.ui.postMessage({ text: textToSpeech, type: _consts__WEBPACK_IMPORTED_MODULE_0__.READ_ALL_RESPONSE });
    }
    else if (msg === _consts__WEBPACK_IMPORTED_MODULE_0__.GET_ALL_REQUEST) {
        figma.ui.postMessage({ text: textToSpeech, type: _consts__WEBPACK_IMPORTED_MODULE_0__.GET_ALL_RESPONSE });
    }
    else if (msg === _consts__WEBPACK_IMPORTED_MODULE_0__.CLOSE) {
        figma.closePlugin();
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDWFA7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055RztBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlCQUFpQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZ0JBQWdCO0FBQ2pEO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsZ0JBQWdCLHFEQUFnQjtBQUNoQywrQkFBK0IsMEJBQTBCLHNEQUFpQixFQUFFO0FBQzVFO0FBQ0EscUJBQXFCLG9EQUFlO0FBQ3BDLCtCQUErQiwwQkFBMEIscURBQWdCLEVBQUU7QUFDM0U7QUFDQSxxQkFBcUIsMENBQUs7QUFDMUI7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQWNjZXNzaWJpbGl0eS8uL3NyYy9jb25zdHMudHMiLCJ3ZWJwYWNrOi8vQWNjZXNzaWJpbGl0eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9BY2Nlc3NpYmlsaXR5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9BY2Nlc3NpYmlsaXR5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQWNjZXNzaWJpbGl0eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0FjY2Vzc2liaWxpdHkvLi9zcmMvY29kZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUkVBRF9BTExfUkVRVUVTVCA9ICdyZWFkLWFsbC1yZXF1ZXN0JztcbmV4cG9ydCBjb25zdCBHRVRfQUxMX1JFUVVFU1QgPSAnZ2V0LWFsbC1yZXF1ZXN0JztcbmV4cG9ydCBjb25zdCBSRUFEX0FMTF9SRVNQT05TRSA9ICdyZWFkLWFsbC1yZXNwb25zZSc7XG5leHBvcnQgY29uc3QgR0VUX0FMTF9SRVNQT05TRSA9ICdnZXQtYWxsLXJlc3BvbnNlJztcbmV4cG9ydCBjb25zdCBDTE9TRSA9ICdjbG9zZSc7XG5leHBvcnQgY29uc3QgV0VMQ09NRV9NRVNTQUdFID0gJ1dlbGNvbWUgdG8gYWNjZXNzaWJsaXR5IHBsdWdpbi4gUHJlc3MgQSB0byByZWFkIGFsbCB0aGUgZnJhbWVzLiBQcmVzcyBCIHRvIHN0YXJ0IHJlYWRpbmcgc2VwYXJhdGUgZWxlbWVudHMuIFByZXNzIEVzY2FwZSBrZXkgdG8gc3RvcCBhbmQgY2xvc2UgdGhlIHBsdWdpbi4nO1xuZXhwb3J0IGNvbnN0IElOU1RSVUNUSU9OUyA9ICdVc2UgY2xvc2luZyBzcXVhcmUgYnJhY2tldCB0byByZWFkIG5leHQgZWxlbWVudCBhbmQgb3BlbmluZyBzcXVhcmUgYnJhY2tldCB0byByZWFkIHByZXZpb3VzIGVsZW1lbnQuJztcbmV4cG9ydCBjb25zdCBSRUFEX0FMTF9LRVkgPSAnS2V5QSc7XG5leHBvcnQgY29uc3QgUkVBRF9TRVBBUkFURV9LRVkgPSAnS2V5Qic7XG5leHBvcnQgY29uc3QgTkVYVF9FTEVNRU5UX0tFWSA9ICdCcmFja2V0UmlnaHQnO1xuZXhwb3J0IGNvbnN0IFBSRVZJT1VTX0VMRU1FTlRfS0VZID0gJ0JyYWNrZXRMZWZ0JztcbmV4cG9ydCBjb25zdCBDTE9TRV9QTFVHSU5fS0VZID0gJ0VzY2FwZSc7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IENMT1NFLCBHRVRfQUxMX1JFUVVFU1QsIEdFVF9BTExfUkVTUE9OU0UsIFJFQURfQUxMX1JFUVVFU1QsIFJFQURfQUxMX1JFU1BPTlNFIH0gZnJvbSBcIi4vY29uc3RzXCI7XG5maWdtYS5zaG93VUkoX19odG1sX18pO1xuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICBmaWdtYS5za2lwSW52aXNpYmxlSW5zdGFuY2VDaGlsZHJlbiA9IHRydWU7XG4gICAgY29uc3QgZnJhbWVzID0gZmlnbWEuY3VycmVudFBhZ2VcbiAgICAgICAgLmZpbmRBbGxXaXRoQ3JpdGVyaWEoeyB0eXBlczogWydGUkFNRSddIH0pXG4gICAgICAgIC5maWx0ZXIoZnJhbWUgPT4gZnJhbWUucGFyZW50LnR5cGUgPT09ICdQQUdFJylcbiAgICAgICAgLmZpbHRlcihmcmFtZSA9PiBmcmFtZS52aXNpYmxlKTtcbiAgICBjb25zdCB0ZXh0VG9TcGVlY2ggPSBbXTtcbiAgICBmcmFtZXMuZm9yRWFjaChmcmFtZSA9PiB7XG4gICAgICAgIHRleHRUb1NwZWVjaC5wdXNoKGZyYW1lLm5hbWUpO1xuICAgICAgICBjb25zdCB0ZXh0Tm9kZXMgPSBmcmFtZVxuICAgICAgICAgICAgLmZpbmRBbGxXaXRoQ3JpdGVyaWEoeyB0eXBlczogWydURVhUJ10gfSlcbiAgICAgICAgICAgIC5maWx0ZXIobm9kZSA9PiBub2RlLnZpc2libGUpXG4gICAgICAgICAgICAuc29ydCgoYSwgYikgPT4gTWF0aC5yb3VuZChhLnkpIC0gTWF0aC5yb3VuZChiLnkpKVxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IE1hdGgucm91bmQoYS54KSAtIE1hdGgucm91bmQoYi54KSk7XG4gICAgICAgIHRleHROb2Rlcy5mb3JFYWNoKG4gPT4gY29uc29sZS5sb2cobi5jaGFyYWN0ZXJzLCBuLngsIG4ueSkpO1xuICAgICAgICBjb25zdCB0ZXh0cyA9IHRleHROb2Rlcy5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5yZWFjdGlvbnMubGVuZ3RoICE9PSAwICYmIG5vZGUucmVhY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGBCdXR0b24gJHtub2RlLmNoYXJhY3RlcnN9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlLmNoYXJhY3RlcnM7XG4gICAgICAgIH0pO1xuICAgICAgICB0ZXh0VG9TcGVlY2gucHVzaCh0ZXh0cyk7XG4gICAgfSk7XG4gICAgaWYgKG1zZyA9PT0gUkVBRF9BTExfUkVRVUVTVCkge1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHRleHQ6IHRleHRUb1NwZWVjaCwgdHlwZTogUkVBRF9BTExfUkVTUE9OU0UgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1zZyA9PT0gR0VUX0FMTF9SRVFVRVNUKSB7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdGV4dDogdGV4dFRvU3BlZWNoLCB0eXBlOiBHRVRfQUxMX1JFU1BPTlNFIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtc2cgPT09IENMT1NFKSB7XG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==