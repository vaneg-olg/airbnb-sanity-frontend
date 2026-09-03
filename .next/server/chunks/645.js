"use strict";
exports.id = 645;
exports.ids = [645];
exports.modules = {

/***/ 6585:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ useBookmarks)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const STORAGE_KEY = "airbnb_bookmarks";
const FOLDERS_KEY = "airbnb_bookmark_folders";
const useBookmarks = ()=>{
    const { 0: bookmarks , 1: setBookmarks  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const { 0: folders , 1: setFolders  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const { 0: isLoaded , 1: setIsLoaded  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    // Load from localStorage on mount
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const savedBookmarks = localStorage.getItem(STORAGE_KEY);
        const savedFolders = localStorage.getItem(FOLDERS_KEY);
        if (savedBookmarks) {
            setBookmarks(JSON.parse(savedBookmarks));
        }
        if (savedFolders) {
            setFolders(JSON.parse(savedFolders));
        } else {
            // Initialize with default folder
            const defaultFolders = [
                {
                    id: "all",
                    name: "All Bookmarks",
                    isDefault: true,
                    createdAt: new Date().toISOString()
                }, 
            ];
            setFolders(defaultFolders);
            localStorage.setItem(FOLDERS_KEY, JSON.stringify(defaultFolders));
        }
        setIsLoaded(true);
    }, []);
    // Save bookmarks to localStorage
    const saveBookmarks = (newBookmarks)=>{
        setBookmarks(newBookmarks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
    };
    // Save folders to localStorage
    const saveFolders = (newFolders)=>{
        setFolders(newFolders);
        localStorage.setItem(FOLDERS_KEY, JSON.stringify(newFolders));
    };
    // Add bookmark
    const addBookmark = (property, folderId = "all")=>{
        const newBookmark = {
            id: `${property._id}-${Date.now()}`,
            propertyId: property._id,
            propertySlug: property.slug.current,
            title: property.title,
            pricePerNight: property.pricePerNight,
            mainImage: property.mainImage,
            folderId: folderId,
            addedAt: new Date().toISOString()
        };
        saveBookmarks([
            ...bookmarks,
            newBookmark
        ]);
        return newBookmark;
    };
    // Remove bookmark
    const removeBookmark = (bookmarkId)=>{
        saveBookmarks(bookmarks.filter((b)=>b.id !== bookmarkId));
    };
    // Move bookmark to folder
    const moveBookmarkToFolder = (bookmarkId, folderId)=>{
        const updated = bookmarks.map((b)=>b.id === bookmarkId ? {
                ...b,
                folderId
            } : b);
        saveBookmarks(updated);
    };
    // Check if property is bookmarked
    const isBookmarked = (propertyId)=>{
        return bookmarks.some((b)=>b.propertyId === propertyId);
    };
    // Get bookmark for property
    const getBookmarkForProperty = (propertyId)=>{
        return bookmarks.find((b)=>b.propertyId === propertyId);
    };
    // Get bookmarks by folder
    const getBookmarksByFolder = (folderId)=>{
        if (folderId === "all") {
            return bookmarks;
        }
        return bookmarks.filter((b)=>b.folderId === folderId);
    };
    // Create new folder
    const createFolder = (name)=>{
        const newFolder = {
            id: `folder-${Date.now()}`,
            name: name,
            isDefault: false,
            createdAt: new Date().toISOString()
        };
        saveFolders([
            ...folders,
            newFolder
        ]);
        return newFolder;
    };
    // Rename folder
    const renameFolder = (folderId, newName)=>{
        const updated = folders.map((f)=>f.id === folderId ? {
                ...f,
                name: newName
            } : f);
        saveFolders(updated);
    };
    // Delete folder and move its bookmarks to 'all'
    const deleteFolder = (folderId)=>{
        if (folderId === "all") return; // Can't delete default folder
        // Move bookmarks from this folder to 'all'
        const updated = bookmarks.map((b)=>b.folderId === folderId ? {
                ...b,
                folderId: "all"
            } : b);
        saveBookmarks(updated);
        // Remove folder
        saveFolders(folders.filter((f)=>f.id !== folderId));
    };
    // Get folder by id
    const getFolder = (folderId)=>{
        return folders.find((f)=>f.id === folderId);
    };
    return {
        bookmarks,
        folders,
        isLoaded,
        addBookmark,
        removeBookmark,
        moveBookmarkToFolder,
        isBookmarked,
        getBookmarkForProperty,
        getBookmarksByFolder,
        createFolder,
        renameFolder,
        deleteFolder,
        getFolder
    };
};


/***/ }),

/***/ 3774:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ sanityClient),
/* harmony export */   "u": () => (/* binding */ urlFor)
/* harmony export */ });
/* harmony import */ var next_sanity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5879);
/* harmony import */ var next_sanity__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_sanity__WEBPACK_IMPORTED_MODULE_0__);

const config = {
    /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/ dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: "production" === "production"
};
/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/ const urlFor = (source)=>(0,next_sanity__WEBPACK_IMPORTED_MODULE_0__.createImageUrlBuilder)(config).image(source);
// Set up the client for fetching data in the getProps page functions
const sanityClient = (0,next_sanity__WEBPACK_IMPORTED_MODULE_0__.createClient)(config);


/***/ })

};
;