import { useState, useEffect } from "react"
import {
  fetchBookmarkFolders,
  fetchBookmarksInFolder,
  createBookmark,
  deleteBookmark,
  createBookmarkFolder,
  isPropertyBookmarked,
} from "../utils/bookmarkUtils"
import BookmarkFolder from "./BookmarkFolder"

const BookmarkManager = ({ propertyId, propertyTitle }) => {
  const [folders, setFolders] = useState([])
  const [bookmarksByFolder, setBookmarksByFolder] = useState({})
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newFolderName, setNewFolderName] = useState("")
  const [showNewFolderInput, setShowNewFolderInput] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState(null)

  // Load folders and bookmarks on mount
  useEffect(() => {
    loadBookmarkData()
  }, [propertyId])

  const loadBookmarkData = async () => {
    setIsLoading(true)
    try {
      // Fetch all folders
      const fetchedFolders = await fetchBookmarkFolders()
      setFolders(fetchedFolders)

      // Fetch bookmarks for each folder
      const bookmarksByFolderMap = {}
      for (const folder of fetchedFolders) {
        const bookmarks = await fetchBookmarksInFolder(folder._id)
        bookmarksByFolderMap[folder._id] = bookmarks
      }
      setBookmarksByFolder(bookmarksByFolderMap)

      // Check if current property is bookmarked
      const bookmarked = await isPropertyBookmarked(propertyId)
      setIsBookmarked(bookmarked)
    } catch (error) {
      console.error("Error loading bookmark data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return

    try {
      const newFolder = await createBookmarkFolder(newFolderName)
      // In a real implementation, this would include the _id from the server response
      const folderWithId = { ...newFolder, _id: `temp_${Date.now()}` }
      setFolders([...folders, folderWithId])
      setBookmarksByFolder({ ...bookmarksByFolder, [folderWithId._id]: [] })
      setNewFolderName("")
      setShowNewFolderInput(false)
    } catch (error) {
      console.error("Error creating folder:", error)
    }
  }

  const handleCreateBookmark = async (folderId) => {
    if (!folderId) return

    try {
      const newBookmark = await createBookmark(propertyId, propertyTitle, folderId)
      const bookmarkWithId = { ...newBookmark, _id: `temp_${Date.now()}` }
      
      setBookmarksByFolder({
        ...bookmarksByFolder,
        [folderId]: [...(bookmarksByFolder[folderId] || []), bookmarkWithId],
      })
      setIsBookmarked(true)
      setSelectedFolderId(null)
    } catch (error) {
      console.error("Error creating bookmark:", error)
    }
  }

  const handleDeleteBookmark = async (bookmarkId, folderId) => {
    try {
      await deleteBookmark(bookmarkId)
      setBookmarksByFolder({
        ...bookmarksByFolder,
        [folderId]: bookmarksByFolder[folderId].filter((b) => b._id !== bookmarkId),
      })
      // Check if still bookmarked in any folder
      const stillBookmarked = Object.values(bookmarksByFolder).some((bookmarks) =>
        bookmarks.some((b) => b.propertyId === propertyId)
      )
      setIsBookmarked(stillBookmarked)
    } catch (error) {
      console.error("Error deleting bookmark:", error)
    }
  }

  const handleFolderUpdate = (updatedFolder) => {
    setFolders(folders.map((f) => (f._id === updatedFolder._id ? updatedFolder : f)))
  }

  const handleFolderDelete = (folderId) => {
    setFolders(folders.filter((f) => f._id !== folderId))
    const newBookmarksByFolder = { ...bookmarksByFolder }
    delete newBookmarksByFolder[folderId]
    setBookmarksByFolder(newBookmarksByFolder)
  }

  const handleToggleFolderVisibility = (folderId, isHidden) => {
    setFolders(
      folders.map((f) => (f._id === folderId ? { ...f, isHidden } : f))
    )
  }

  if (isLoading) {
    return <div className="bookmark-manager">Loading bookmarks...</div>
  }

  return (
    <div className="bookmark-manager">
      <div className="bookmark-manager-header">
        <h2>My Bookmarks</h2>
        {isBookmarked && <span className="bookmark-badge">★ Bookmarked</span>}
      </div>

      {/* New Folder Section */}
      <div className="bookmark-new-folder">
        {!showNewFolderInput ? (
          <button
            onClick={() => setShowNewFolderInput(true)}
            className="btn-new-folder"
          >
            + New Folder
          </button>
        ) : (
          <div className="bookmark-new-folder-input">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name..."
              onKeyPress={(e) => e.key === "Enter" && handleCreateFolder()}
              autoFocus
            />
            <button onClick={handleCreateFolder} className="btn-create">
              Create
            </button>
            <button
              onClick={() => {
                setShowNewFolderInput(false)
                setNewFolderName("")
              }}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Folders List */}
      {folders.length > 0 ? (
        <div className="bookmark-folders-list">
          {folders.map((folder) => (
            <div key={folder._id} className="bookmark-folder-wrapper">
              <BookmarkFolder
                folder={folder}
                bookmarks={bookmarksByFolder[folder._id] || []}
                onEdit={handleFolderUpdate}
                onDelete={handleFolderDelete}
                onToggleVisibility={handleToggleFolderVisibility}
              />
              {folder.isHidden ? null : (
                <button
                  onClick={() => setSelectedFolderId(folder._id)}
                  className="btn-add-bookmark"
                >
                  Add this property
                </button>
              )}
              {selectedFolderId === folder._id && (
                <button
                  onClick={() => handleCreateBookmark(folder._id)}
                  className="btn-confirm-bookmark"
                >
                  Confirm Add
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="bookmark-empty">No folders yet. Create one to start bookmarking!</p>
      )}
    </div>
  )
}

export default BookmarkManager
