import { sanityClient } from "../sanity"

/**
 * Fetch all bookmark folders for the current user
 * @returns {Promise<Array>} Array of bookmark folders
 */
export const fetchBookmarkFolders = async () => {
  const query = `*[_type == "bookmarkFolder"] | order(order asc)`
  try {
    const folders = await sanityClient.fetch(query)
    return folders
  } catch (error) {
    console.error("Error fetching bookmark folders:", error)
    return []
  }
}

/**
 * Fetch all bookmarks for a specific folder
 * @param {string} folderId - The ID of the folder
 * @returns {Promise<Array>} Array of bookmarks in the folder
 */
export const fetchBookmarksInFolder = async (folderId) => {
  const query = `*[_type == "bookmark" && folderId._ref == $folderId] | order(order asc)`
  try {
    const bookmarks = await sanityClient.fetch(query, { folderId })
    return bookmarks
  } catch (error) {
    console.error("Error fetching bookmarks:", error)
    return []
  }
}

/**
 * Fetch all bookmarks across all folders
 * @returns {Promise<Array>} Array of all bookmarks
 */
export const fetchAllBookmarks = async () => {
  const query = `*[_type == "bookmark"] | order(createdAt desc)`
  try {
    const bookmarks = await sanityClient.fetch(query)
    return bookmarks
  } catch (error) {
    console.error("Error fetching all bookmarks:", error)
    return []
  }
}

/**
 * Check if a property is already bookmarked
 * @param {string} propertyId - The ID of the property
 * @returns {Promise<boolean>} Whether the property is bookmarked
 */
export const isPropertyBookmarked = async (propertyId) => {
  const query = `*[_type == "bookmark" && propertyId == $propertyId][0]`
  try {
    const bookmark = await sanityClient.fetch(query, { propertyId })
    return !!bookmark
  } catch (error) {
    console.error("Error checking bookmark:", error)
    return false
  }
}

/**
 * Get the bookmark for a specific property
 * @param {string} propertyId - The ID of the property
 * @returns {Promise<Object|null>} The bookmark object or null
 */
export const getBookmarkForProperty = async (propertyId) => {
  const query = `*[_type == "bookmark" && propertyId == $propertyId][0]{
    _id,
    propertyId,
    propertyTitle,
    folderId,
    order,
    createdAt,
    updatedAt
  }`
  try {
    const bookmark = await sanityClient.fetch(query, { propertyId })
    return bookmark || null
  } catch (error) {
    console.error("Error getting bookmark:", error)
    return null
  }
}

/**
 * Create a new bookmark folder (requires authentication)
 * Note: This is a reference implementation. 
 * In production, use Sanity's authenticated client with mutations
 * @param {string} name - The name of the folder
 * @returns {Promise<Object>} The created folder
 */
export const createBookmarkFolder = async (name) => {
  const folder = {
    _type: "bookmarkFolder",
    name,
    isHidden: false,
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  // This would require an authenticated mutation call
  // Implementation depends on how authentication is set up in the project
  console.log("Create folder would send:", folder)
  return folder
}

/**
 * Update a bookmark folder (requires authentication)
 * @param {string} folderId - The ID of the folder to update
 * @param {Object} updates - The fields to update
 * @returns {Promise<Object>} The updated folder
 */
export const updateBookmarkFolder = async (folderId, updates) => {
  const updatedFolder = {
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  
  // This would require an authenticated mutation call
  console.log("Update folder would send:", updatedFolder)
  return updatedFolder
}

/**
 * Delete a bookmark folder (requires authentication)
 * @param {string} folderId - The ID of the folder to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteBookmarkFolder = async (folderId) => {
  // This would require an authenticated mutation call
  console.log("Delete folder:", folderId)
  return true
}

/**
 * Create a new bookmark (requires authentication)
 * @param {string} propertyId - The ID of the property
 * @param {string} propertyTitle - The title of the property
 * @param {string} folderId - The ID of the folder to save to
 * @returns {Promise<Object>} The created bookmark
 */
export const createBookmark = async (propertyId, propertyTitle, folderId) => {
  const bookmark = {
    _type: "bookmark",
    propertyId,
    propertyTitle,
    folderId: {
      _type: "reference",
      _ref: folderId,
    },
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  // This would require an authenticated mutation call
  console.log("Create bookmark would send:", bookmark)
  return bookmark
}

/**
 * Delete a bookmark (requires authentication)
 * @param {string} bookmarkId - The ID of the bookmark to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteBookmark = async (bookmarkId) => {
  // This would require an authenticated mutation call
  console.log("Delete bookmark:", bookmarkId)
  return true
}

/**
 * Move a bookmark to a different folder (requires authentication)
 * @param {string} bookmarkId - The ID of the bookmark
 * @param {string} newFolderId - The ID of the new folder
 * @returns {Promise<Object>} The updated bookmark
 */
export const moveBookmarkToFolder = async (bookmarkId, newFolderId) => {
  const update = {
    folderId: {
      _type: "reference",
      _ref: newFolderId,
    },
    updatedAt: new Date().toISOString(),
  }
  
  // This would require an authenticated mutation call
  console.log("Move bookmark would send:", update)
  return update
}

/**
 * Hide/show a bookmark folder
 * @param {string} folderId - The ID of the folder
 * @param {boolean} isHidden - Whether to hide the folder
 * @returns {Promise<Object>} The updated folder
 */
export const toggleBookmarkFolderVisibility = async (folderId, isHidden) => {
  const update = {
    isHidden,
    updatedAt: new Date().toISOString(),
  }
  
  // This would require an authenticated mutation call
  console.log("Toggle folder visibility would send:", update)
  return update
}
