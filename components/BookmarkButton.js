import { useState, useEffect } from "react"
import {
  isPropertyBookmarked,
  fetchBookmarkFolders,
  createBookmark,
  deleteBookmark,
  getBookmarkForProperty,
} from "../utils/bookmarkUtils"

const BookmarkButton = ({ propertyId, propertyTitle, size = "medium" }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [folders, setFolders] = useState([])
  const [showFolderSelect, setShowFolderSelect] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentBookmark, setCurrentBookmark] = useState(null)

  useEffect(() => {
    checkIfBookmarked()
  }, [propertyId])

  const checkIfBookmarked = async () => {
    const bookmarked = await isPropertyBookmarked(propertyId)
    setIsBookmarked(bookmarked)
    
    if (bookmarked) {
      const bookmark = await getBookmarkForProperty(propertyId)
      setCurrentBookmark(bookmark)
    }
  }

  const handleBookmarkClick = async () => {
    if (isBookmarked && currentBookmark) {
      // Remove bookmark
      setIsLoading(true)
      try {
        await deleteBookmark(currentBookmark._id)
        setIsBookmarked(false)
        setCurrentBookmark(null)
        setShowFolderSelect(false)
      } catch (error) {
        console.error("Error removing bookmark:", error)
      } finally {
        setIsLoading(false)
      }
    } else {
      // Show folder selection
      if (folders.length === 0) {
        const fetchedFolders = await fetchBookmarkFolders()
        setFolders(fetchedFolders.filter((f) => !f.isHidden))
      }
      setShowFolderSelect(true)
    }
  }

  const handleSelectFolder = async (folderId) => {
    setIsLoading(true)
    try {
      await createBookmark(propertyId, propertyTitle, folderId)
      setIsBookmarked(true)
      setShowFolderSelect(false)
      
      // Fetch the bookmark to get its ID
      const bookmark = await getBookmarkForProperty(propertyId)
      setCurrentBookmark(bookmark)
    } catch (error) {
      console.error("Error adding bookmark:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`bookmark-button-container bookmark-size-${size}`}>
      <button
        onClick={handleBookmarkClick}
        disabled={isLoading}
        className={`bookmark-button ${isBookmarked ? "bookmarked" : ""} ${isLoading ? "loading" : ""}`}
        title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <span className="bookmark-icon">{isBookmarked ? "★" : "☆"}</span>
        <span className="bookmark-text">
          {isLoading ? "..." : isBookmarked ? "Bookmarked" : "Bookmark"}
        </span>
      </button>

      {showFolderSelect && !isBookmarked && (
        <div className="bookmark-folder-select">
          <div className="bookmark-folder-select-header">
            <h4>Select a folder:</h4>
            <button
              onClick={() => setShowFolderSelect(false)}
              className="btn-close"
            >
              ×
            </button>
          </div>
          {folders.length > 0 ? (
            <div className="bookmark-folder-options">
              {folders.map((folder) => (
                <button
                  key={folder._id}
                  onClick={() => handleSelectFolder(folder._id)}
                  className="bookmark-folder-option"
                  disabled={isLoading}
                >
                  {folder.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="bookmark-no-folders">
              No folders available. Create one in your bookmarks.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default BookmarkButton
