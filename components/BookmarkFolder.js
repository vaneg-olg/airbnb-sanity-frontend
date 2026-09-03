import { useState } from "react"
import { toggleBookmarkFolderVisibility, deleteBookmarkFolder, updateBookmarkFolder } from "../utils/bookmarkUtils"

const BookmarkFolder = ({ folder, bookmarks = [], onEdit, onDelete, onToggleVisibility }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(folder.name)

  const handleSave = async () => {
    if (editName.trim() && editName !== folder.name) {
      await updateBookmarkFolder(folder._id, { name: editName })
      onEdit && onEdit({ ...folder, name: editName })
    }
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (confirm(`Delete folder "${folder.name}" and all its bookmarks?`)) {
      await deleteBookmarkFolder(folder._id)
      onDelete && onDelete(folder._id)
    }
  }

  const handleToggleVisibility = async () => {
    const newHiddenState = !folder.isHidden
    await toggleBookmarkFolderVisibility(folder._id, newHiddenState)
    onToggleVisibility && onToggleVisibility(folder._id, newHiddenState)
  }

  if (folder.isHidden) {
    return (
      <div className="bookmark-folder bookmark-folder-hidden">
        <div className="bookmark-folder-header">
          <span className="bookmark-folder-name">{folder.name} (Hidden)</span>
          <button onClick={handleToggleVisibility} className="btn-show">
            Show
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bookmark-folder">
      <div className="bookmark-folder-header">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn-expand"
        >
          {isExpanded ? "▼" : "▶"}
        </button>
        {isEditing ? (
          <div className="bookmark-folder-edit">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
            <button onClick={handleSave} className="btn-save">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h3 className="bookmark-folder-name">{folder.name}</h3>
            <div className="bookmark-folder-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="btn-edit"
                title="Edit folder"
              >
                ✎
              </button>
              <button
                onClick={handleToggleVisibility}
                className="btn-hide"
                title="Hide folder"
              >
                ◯
              </button>
              <button
                onClick={handleDelete}
                className="btn-delete"
                title="Delete folder"
              >
                ×
              </button>
            </div>
          </>
        )}
      </div>
      {isExpanded && (
        <div className="bookmark-folder-content">
          {bookmarks.length > 0 ? (
            <ul className="bookmarks-list">
              {bookmarks.map((bookmark) => (
                <li key={bookmark._id} className="bookmark-item">
                  <span className="bookmark-title">{bookmark.propertyTitle}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="bookmark-empty">No bookmarks in this folder</p>
          )}
        </div>
      )}
    </div>
  )
}

export default BookmarkFolder
