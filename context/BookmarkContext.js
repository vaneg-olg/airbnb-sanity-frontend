import React, { createContext, useState, useEffect } from 'react'

export const BookmarkContext = createContext()

export const BookmarkProvider = ({ children }) => {
  const [folders, setFolders] = useState([])
  const [bookmarks, setBookmarks] = useState({}) // { folderId: [propertyIds] }

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedFolders = localStorage.getItem('folders')
    const savedBookmarks = localStorage.getItem('bookmarks')
    
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders))
    }
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }
  }, [])

  // Save folders to localStorage
  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders))
  }, [folders])

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const createFolder = (folderName) => {
    const newFolder = {
      id: Date.now().toString(),
      name: folderName,
      createdAt: new Date().toISOString(),
    }
    setFolders([...folders, newFolder])
    setBookmarks({
      ...bookmarks,
      [newFolder.id]: [],
    })
    return newFolder.id
  }

  const deleteFolder = (folderId) => {
    setFolders(folders.filter(f => f.id !== folderId))
    const updatedBookmarks = { ...bookmarks }
    delete updatedBookmarks[folderId]
    setBookmarks(updatedBookmarks)
  }

  const editFolder = (folderId, newName) => {
    setFolders(
      folders.map(f =>
        f.id === folderId ? { ...f, name: newName } : f
      )
    )
  }

  const addBookmark = (propertyId, folderId) => {
    if (!bookmarks[folderId]) {
      setBookmarks({
        ...bookmarks,
        [folderId]: [propertyId],
      })
    } else if (!bookmarks[folderId].includes(propertyId)) {
      setBookmarks({
        ...bookmarks,
        [folderId]: [...bookmarks[folderId], propertyId],
      })
    }
  }

  const removeBookmark = (propertyId, folderId) => {
    setBookmarks({
      ...bookmarks,
      [folderId]: bookmarks[folderId].filter(id => id !== propertyId),
    })
  }

  const isBookmarked = (propertyId, folderId) => {
    return bookmarks[folderId] && bookmarks[folderId].includes(propertyId)
  }

  const getBookmarksInFolder = (folderId) => {
    return bookmarks[folderId] || []
  }

  const getAllBookmarks = () => {
    const allBookmarks = []
    Object.keys(bookmarks).forEach(folderId => {
      bookmarks[folderId].forEach(propertyId => {
        allBookmarks.push({ propertyId, folderId })
      })
    })
    return allBookmarks
  }

  return (
    <BookmarkContext.Provider
      value={{
        folders,
        bookmarks,
        createFolder,
        deleteFolder,
        editFolder,
        addBookmark,
        removeBookmark,
        isBookmarked,
        getBookmarksInFolder,
        getAllBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}
