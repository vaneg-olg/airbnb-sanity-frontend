exports.id = 732;
exports.ids = [732];
exports.modules = {

/***/ 7052:
/***/ ((module) => {

// Exports
module.exports = {
	"bookmarkContainer": "BookmarkButton_bookmarkContainer__UO7wX",
	"bookmarkButton": "BookmarkButton_bookmarkButton__MLUeY",
	"bookmarked": "BookmarkButton_bookmarked__q1kfe",
	"icon": "BookmarkButton_icon__Ms_o0",
	"label": "BookmarkButton_label__XfbnA",
	"folderMenu": "BookmarkButton_folderMenu__jTJUq",
	"menuTitle": "BookmarkButton_menuTitle__3MpqV",
	"folderOption": "BookmarkButton_folderOption__bbqvu",
	"active": "BookmarkButton_active__EODc2",
	"removeButton": "BookmarkButton_removeButton__1SH9e"
};


/***/ }),

/***/ 5769:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useBookmarks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6585);
/* harmony import */ var _styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7052);
/* harmony import */ var _styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3__);




const BookmarkButton = ({ property , showLabel =true  })=>{
    const { addBookmark , removeBookmark , isBookmarked , folders , moveBookmarkToFolder , getBookmarkForProperty  } = (0,_hooks_useBookmarks__WEBPACK_IMPORTED_MODULE_2__/* .useBookmarks */ .S)();
    const { 0: showFolderMenu , 1: setShowFolderMenu  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const bookmarked = isBookmarked(property._id);
    const currentBookmark = getBookmarkForProperty(property._id);
    const handleBookmarkClick = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (bookmarked) {
            removeBookmark(currentBookmark.id);
            setShowFolderMenu(false);
        } else {
            setShowFolderMenu(true);
        }
    };
    const handleFolderSelect = (folderId)=>{
        addBookmark(property, folderId);
        setShowFolderMenu(false);
    };
    const handleMoveTo = (folderId)=>{
        if (currentBookmark) {
            moveBookmarkToFolder(currentBookmark.id, folderId);
            setShowFolderMenu(false);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().bookmarkContainer),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                className: `${(_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().bookmarkButton)} ${bookmarked ? (_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().bookmarked) : ""}`,
                onClick: handleBookmarkClick,
                title: bookmarked ? "Remove bookmark" : "Add bookmark",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: (_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().icon),
                        children: "♥"
                    }),
                    showLabel && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: (_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().label),
                        children: bookmarked ? "Bookmarked" : "Bookmark"
                    })
                ]
            }),
            showFolderMenu && !bookmarked && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().folderMenu),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: (_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().menuTitle),
                        children: "Save to folder:"
                    }),
                    folders.map((folder)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: (_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().folderOption),
                            onClick: ()=>handleFolderSelect(folder.id),
                            children: folder.name
                        }, folder.id))
                ]
            }),
            showFolderMenu && bookmarked && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().folderMenu),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: (_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().menuTitle),
                        children: "Move to folder:"
                    }),
                    folders.map((folder)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: `${(_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().folderOption)} ${currentBookmark?.folderId === folder.id ? (_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().active) : ""}`,
                            onClick: ()=>handleMoveTo(folder.id),
                            children: folder.name
                        }, folder.id)),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: `${(_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().folderOption)} ${(_styles_BookmarkButton_module_css__WEBPACK_IMPORTED_MODULE_3___default().removeButton)}`,
                        onClick: ()=>{
                            removeBookmark(currentBookmark.id);
                            setShowFolderMenu(false);
                        },
                        children: "Remove bookmark"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookmarkButton);


/***/ }),

/***/ 1313:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ isMultiple)
/* harmony export */ });
const isMultiple = (value)=>value === 0 || value > 1 ? "s" : "";


/***/ })

};
;