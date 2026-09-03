import { useState } from 'react'
import { useBookmarks } from '../hooks/useBookmarks'
import styles from '../styles/BookmarkButton.module.css'

const BookmarkButton = ({ property, showLabel = true }) => {
  const { addBookmark, removeBookmark, isBookmarked, folders, moveBookmarkToFolder, getBookmarkForProperty } = useBookmarks()
  const [showFolderMenu, setShowFolderMenu] = useState(false)
  const bookmarked = isBookmarked(property._id)
  const currentBookmark = getBookmarkForProperty(property._id)

  const handleBookmarkClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (bookmarked) {
      removeBookmark(currentBookmark.id)
      setShowFolderMenu(false)
    } else {
      setShowFolderMenu(true)
    }
  }

  const handleFolderSelect = (folderId) => {
    addBookmark(property, folderId)
    setShowFolderMenu(false)
  }

  const handleMoveTo = (folderId) => {
    if (currentBookmark) {
      moveBookmarkToFolder(currentBookmark.id, folderId)
      setShowFolderMenu(false)
    }
  }

  return (
    <div className={styles.bookmarkContainer}>
      <button
        className={`${styles.bookmarkButton} ${bookmarked ? styles.bookmarked : ''}`}
        onClick={handleBookmarkClick}
        title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        <span className={styles.icon}>♥</span>
        {showLabel && <span className={styles.label}>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>}
      </button>

      {showFolderMenu && !bookmarked && (
        <div className={styles.folderMenu}>
          <p className={styles.menuTitle}>Save to folder:</p>
          {folders.map((folder) => (
            <button
              key={folder.id}
              className={styles.folderOption}
              onClick={() => handleFolderSelect(folder.id)}
            >
              {folder.name}
            </button>
          ))}
        </div>
      )}

      {showFolderMenu && bookmarked && (
        <div className={styles.folderMenu}>
          <p className={styles.menuTitle}>Move to folder:</p>
          {folders.map((folder) => (
            <button
              key={folder.id}
              className={`${styles.folderOption} ${currentBookmark?.folderId === folder.id ? styles.active : ''}`}
              onClick={() => handleMoveTo(folder.id)}
            >
              {folder.name}
            </button>
          ))}
          <button
            className={`${styles.folderOption} ${styles.removeButton}`}
            onClick={() => {
              removeBookmark(currentBookmark.id)
              setShowFolderMenu(false)
            }}
          >
            Remove bookmark
          </button>
        </div>
      )}
    </div>
  )
}

export default BookmarkButton
