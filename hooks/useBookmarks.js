import { useState, useEffect } from 'react'

const STORAGE_KEY = 'airbnb_bookmarks'
const FOLDERS_KEY = 'airbnb_bookmark_folders'

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([])
  const [folders, setFolders] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem(STORAGE_KEY)
    const savedFolders = localStorage.getItem(FOLDERS_KEY)

    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders))
    } else {
      // Initialize with default folder
      const defaultFolders = [
        {
          id: 'all',
          name: 'All Bookmarks',
          isDefault: true,
          createdAt: new Date().toISOString(),
        },
      ]
      setFolders(defaultFolders)
      localStorage.setItem(FOLDERS_KEY, JSON.stringify(defaultFolders))
    }
    setIsLoaded(true)
  }, [])

  // Save bookmarks to localStorage
  const saveBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks))
  }

  // Save folders to localStorage
  const saveFolders = (newFolders) => {
    setFolders(newFolders)
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(newFolders))
  }

  // Add bookmark
  const addBookmark = (property, folderId = 'all') => {
    const newBookmark = {
      id: `${property._id}-${Date.now()}`,
      propertyId: property._id,
      propertySlug: property.slug.current,
      title: property.title,
      pricePerNight: property.pricePerNight,
      mainImage: property.mainImage,
      folderId: folderId,
      addedAt: new Date().toISOString(),
    }
    saveBookmarks([...bookmarks, newBookmark])
    return newBookmark
  }

  // Remove bookmark
  const removeBookmark = (bookmarkId) => {
    saveBookmarks(bookmarks.filter((b) => b.id !== bookmarkId))
  }

  // Move bookmark to folder
  const moveBookmarkToFolder = (bookmarkId, folderId) => {
    const updated = bookmarks.map((b) =>
      b.id === bookmarkId ? { ...b, folderId } : b
    )
    saveBookmarks(updated)
  }

  // Check if property is bookmarked
  const isBookmarked = (propertyId) => {
    return bookmarks.some((b) => b.propertyId === propertyId)
  }

  // Get bookmark for property
  const getBookmarkForProperty = (propertyId) => {
    return bookmarks.find((b) => b.propertyId === propertyId)
  }

  // Get bookmarks by folder
  const getBookmarksByFolder = (folderId) => {
    if (folderId === 'all') {
      return bookmarks
    }
    return bookmarks.filter((b) => b.folderId === folderId)
  }

  // Create new folder
  const createFolder = (name) => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name: name,
      isDefault: false,
      createdAt: new Date().toISOString(),
    }
    saveFolders([...folders, newFolder])
    return newFolder
  }

  // Rename folder
  const renameFolder = (folderId, newName) => {
    const updated = folders.map((f) =>
      f.id === folderId ? { ...f, name: newName } : f
    )
    saveFolders(updated)
  }

  // Delete folder and move its bookmarks to 'all'
  const deleteFolder = (folderId) => {
    if (folderId === 'all') return // Can't delete default folder
    
    // Move bookmarks from this folder to 'all'
    const updated = bookmarks.map((b) =>
      b.folderId === folderId ? { ...b, folderId: 'all' } : b
    )
    saveBookmarks(updated)

    // Remove folder
    saveFolders(folders.filter((f) => f.id !== folderId))
  }

  // Get folder by id
  const getFolder = (folderId) => {
    return folders.find((f) => f.id === folderId)
  }

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
    getFolder,
  }
}
