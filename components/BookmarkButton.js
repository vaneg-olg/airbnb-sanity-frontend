import React, { useContext, useState } from 'react'
import { BookmarkContext } from '../context/BookmarkContext'

const BookmarkButton = ({ propertyId, propertyData }) => {
  const { folders, bookmarks, addBookmark, removeBookmark, isBookmarked } = useContext(BookmarkContext)
  const [showFolderMenu, setShowFolderMenu] = useState(false)

  const handleBookmarkClick = (folderId) => {
    if (isBookmarked(propertyId, folderId)) {
      removeBookmark(propertyId, folderId)
    } else {
      addBookmark(propertyId, folderId)
    }
    setShowFolderMenu(false)
  }

  const getBookmarkedFolders = () => {
    return folders.filter(folder => isBookmarked(propertyId, folder.id))
  }

  const bookmarkedFolders = getBookmarkedFolders()
  const isAnyFolderBookmarked = bookmarkedFolders.length > 0

  return (
    <div className="bookmark-button-container">
      <button
        className={`bookmark-button ${isAnyFolderBookmarked ? 'bookmarked' : ''}`}
        onClick={() => setShowFolderMenu(!showFolderMenu)}
        title={isAnyFolderBookmarked ? `Saved to ${bookmarkedFolders.length} folder${bookmarkedFolders.length > 1 ? 's' : ''}` : 'Add to folder'}
      >
        ♥ {isAnyFolderBookmarked ? bookmarkedFolders.length : ''}
      </button>

      {showFolderMenu && (
        <div className="folder-menu">
          <div className="folder-menu-header">
            <h4>Save to folder</h4>
          </div>
          <div className="folder-list">
            {folders.length === 0 ? (
              <p className="no-folders">No folders yet. Create one to get started!</p>
            ) : (
              folders.map(folder => (
                <button
                  key={folder.id}
                  className={`folder-item ${isBookmarked(propertyId, folder.id) ? 'selected' : ''}`}
                  onClick={() => handleBookmarkClick(folder.id)}
                >
                  <span className="checkbox">
                    {isBookmarked(propertyId, folder.id) ? '✓' : ''}
                  </span>
                  {folder.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default BookmarkButton
