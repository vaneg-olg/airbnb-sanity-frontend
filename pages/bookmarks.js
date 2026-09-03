import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useBookmarks } from '../hooks/useBookmarks'
import { urlFor } from '../sanity'
import styles from '../styles/Bookmarks.module.css'

const Bookmarks = () => {
  const {
    bookmarks,
    folders,
    isLoaded,
    createFolder,
    renameFolder,
    deleteFolder,
    removeBookmark,
    moveBookmarkToFolder,
    getBookmarksByFolder,
  } = useBookmarks()

  const [selectedFolderId, setSelectedFolderId] = useState('all')
  const [showNewFolderInput, setShowNewFolderInput] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [editingFolderId, setEditingFolderId] = useState(null)
  const [editingFolderName, setEditingFolderName] = useState('')
  const [showMoveMenu, setShowMoveMenu] = useState(null)

  useEffect(() => {
    if (isLoaded && folders.length > 0 && !folders.find(f => f.id === selectedFolderId)) {
      setSelectedFolderId('all')
    }
  }, [isLoaded, folders, selectedFolderId])

  if (!isLoaded) {
    return <div className={styles.loading}>Loading bookmarks...</div>
  }

  const selectedBookmarks = getBookmarksByFolder(selectedFolderId)

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName)
      setNewFolderName('')
      setShowNewFolderInput(false)
    }
  }

  const handleRenameFolder = (folderId) => {
    if (editingFolderName.trim()) {
      renameFolder(folderId, editingFolderName)
      setEditingFolderId(null)
      setEditingFolderName('')
    }
  }

  const handleDeleteFolder = (folderId) => {
    if (window.confirm('Delete this folder? All bookmarks will be moved to "All Bookmarks"')) {
      deleteFolder(folderId)
      if (selectedFolderId === folderId) {
        setSelectedFolderId('all')
      }
    }
  }

  const handleMoveBookmark = (bookmarkId, folderId) => {
    moveBookmarkToFolder(bookmarkId, folderId)
    setShowMoveMenu(null)
  }

  return (
    <div className={styles.container}>
      <h1>My Bookmarks</h1>

      <div className={styles.content}>
        {/* Sidebar - Folders */}
        <div className={styles.sidebar}>
          <div className={styles.folderList}>
            <h3>Folders</h3>
            {folders.map((folder) => (
              <div key={folder.id} className={styles.folderItem}>
                <button
                  className={`${styles.folderButton} ${
                    selectedFolderId === folder.id ? styles.active : ''
                  }`}
                  onClick={() => setSelectedFolderId(folder.id)}
                >
                  <span className={styles.folderName}>{folder.name}</span>
                  <span className={styles.bookmarkCount}>
                    ({getBookmarksByFolder(folder.id).length})
                  </span>
                </button>
                {!folder.isDefault && (
                  <div className={styles.folderActions}>
                    <button
                      className={styles.editButton}
                      onClick={() => {
                        setEditingFolderId(folder.id)
                        setEditingFolderName(folder.name)
                      }}
                      title="Rename folder"
                    >
                      ✏️
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteFolder(folder.id)}
                      title="Delete folder"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Create/Edit Folder */}
          {editingFolderId && (
            <div className={styles.editForm}>
              <input
                type="text"
                value={editingFolderName}
                onChange={(e) => setEditingFolderName(e.target.value)}
                placeholder="Folder name"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRenameFolder(editingFolderId)
                  if (e.key === 'Escape') {
                    setEditingFolderId(null)
                    setEditingFolderName('')
                  }
                }}
              />
              <div className={styles.editFormActions}>
                <button
                  className={styles.saveButton}
                  onClick={() => handleRenameFolder(editingFolderId)}
                >
                  Save
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setEditingFolderId(null)
                    setEditingFolderName('')
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {!editingFolderId && (
            <div className={styles.createFolderSection}>
              {!showNewFolderInput ? (
                <button
                  className={styles.createFolderButton}
                  onClick={() => setShowNewFolderInput(true)}
                >
                  + Create Folder
                </button>
              ) : (
                <div className={styles.createFolderForm}>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Folder name"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateFolder()
                      if (e.key === 'Escape') {
                        setShowNewFolderInput(false)
                        setNewFolderName('')
                      }
                    }}
                  />
                  <div className={styles.createFolderActions}>
                    <button className={styles.saveButton} onClick={handleCreateFolder}>
                      Create
                    </button>
                    <button
                      className={styles.cancelButton}
                      onClick={() => {
                        setShowNewFolderInput(false)
                        setNewFolderName('')
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Content - Bookmarks */}
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h2>{folders.find(f => f.id === selectedFolderId)?.name || 'All Bookmarks'}</h2>
            <p className={styles.bookmarkCount}>
              {selectedBookmarks.length} bookmark{selectedBookmarks.length !== 1 ? 's' : ''}
            </p>
          </div>

          {selectedBookmarks.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No bookmarks yet</p>
              <p className={styles.emptyStateHint}>
                {selectedFolderId === 'all'
                  ? 'Start bookmarking properties to see them here'
                  : 'Move bookmarks to this folder to see them here'}
              </p>
              <Link href="/">
                <button className={styles.exploreButton}>Explore Properties</button>
              </Link>
            </div>
          ) : (
            <div className={styles.bookmarksList}>
              {selectedBookmarks.map((bookmark) => (
                <div key={bookmark.id} className={styles.bookmarkCard}>
                  {bookmark.mainImage && (
                    <img
                      src={urlFor(bookmark.mainImage)}
                      alt={bookmark.title}
                      className={styles.bookmarkImage}
                    />
                  )}
                  <div className={styles.bookmarkInfo}>
                    <Link href={`/property/${bookmark.propertySlug}`}>
                      <h3>{bookmark.title}</h3>
                    </Link>
                    <p className={styles.price}>£{bookmark.pricePerNight}/per night</p>
                    <p className={styles.addedDate}>
                      Saved {new Date(bookmark.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={styles.bookmarkActions}>
                    <div className={styles.moveToMenu}>
                      <button
                        className={styles.moveButton}
                        onClick={() =>
                          setShowMoveMenu(showMoveMenu === bookmark.id ? null : bookmark.id)
                        }
                      >
                        Move to...
                      </button>
                      {showMoveMenu === bookmark.id && (
                        <div className={styles.moveOptions}>
                          {folders.map((folder) => (
                            <button
                              key={folder.id}
                              className={`${styles.moveOption} ${
                                bookmark.folderId === folder.id ? styles.active : ''
                              }`}
                              onClick={() =>
                                handleMoveBookmark(bookmark.id, folder.id)
                              }
                            >
                              {folder.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeBookmark(bookmark.id)}
                      title="Remove bookmark"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bookmarks
