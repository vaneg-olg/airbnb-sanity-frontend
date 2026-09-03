import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { BookmarkContext } from '../context/BookmarkContext'
import { sanityClient, urlFor } from '../sanity'

const Folders = ({ allProperties }) => {
  const { folders, deleteFolder, editFolder, bookmarks } = useContext(BookmarkContext)
  const [editingFolderId, setEditingFolderId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [showNewFolderForm, setShowNewFolderForm] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const { createFolder } = useContext(BookmarkContext)

  const handleEditFolder = (folderId, currentName) => {
    setEditingFolderId(folderId)
    setEditingName(currentName)
  }

  const handleSaveEdit = (folderId) => {
    if (editingName.trim()) {
      editFolder(folderId, editingName.trim())
      setEditingFolderId(null)
      setEditingName('')
    }
  }

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim())
      setNewFolderName('')
      setShowNewFolderForm(false)
    }
  }

  const getPropertiesInFolder = (folderId) => {
    const propertyIds = bookmarks[folderId] || []
    return allProperties.filter(p => propertyIds.includes(p._id))
  }

  return (
    <div className="container">
      <h1>My Bookmarks</h1>
      
      <div className="create-folder-section">
        {!showNewFolderForm ? (
          <button
            className="button create-folder-btn"
            onClick={() => setShowNewFolderForm(true)}
          >
            + Create New Folder
          </button>
        ) : (
          <div className="new-folder-form">
            <input
              type="text"
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              autoFocus
            />
            <button
              className="button"
              onClick={handleCreateFolder}
            >
              Create
            </button>
            <button
              className="button secondary"
              onClick={() => setShowNewFolderForm(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {folders.length === 0 ? (
        <div className="no-folders-message">
          <p>No folders yet. Create one to start bookmarking listings!</p>
        </div>
      ) : (
        <div className="folders-grid">
          {folders.map(folder => {
            const propertiesInFolder = getPropertiesInFolder(folder.id)
            const isEditing = editingFolderId === folder.id

            return (
              <div key={folder.id} className="folder-card">
                <div className="folder-header">
                  {isEditing ? (
                    <div className="edit-folder-form">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        autoFocus
                      />
                      <button
                        className="btn-small save"
                        onClick={() => handleSaveEdit(folder.id)}
                      >
                        ✓
                      </button>
                      <button
                        className="btn-small cancel"
                        onClick={() => setEditingFolderId(null)}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2>{folder.name}</h2>
                      <div className="folder-actions">
                        <button
                          className="btn-small edit"
                          onClick={() => handleEditFolder(folder.id, folder.name)}
                          title="Edit folder name"
                        >
                          ✎
                        </button>
                        <button
                          className="btn-small delete"
                          onClick={() => deleteFolder(folder.id)}
                          title="Delete folder"
                        >
                          🗑
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <p className="folder-count">
                  {propertiesInFolder.length} listing{propertiesInFolder.length !== 1 ? 's' : ''}
                </p>

                <div className="folder-properties">
                  {propertiesInFolder.length === 0 ? (
                    <p className="no-properties">No bookmarks in this folder</p>
                  ) : (
                    <div className="properties-preview">
                      {propertiesInFolder.slice(0, 3).map(property => (
                        <Link key={property._id} href={`property/${property.slug.current}`}>
                          <div className="property-thumbnail">
                            <img
                              src={urlFor(property.mainImage).width(100).height(100).url()}
                              alt={property.title}
                            />
                          </div>
                        </Link>
                      ))}
                      {propertiesInFolder.length > 3 && (
                        <div className="more-count">
                          +{propertiesInFolder.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Link href={`/folders/${folder.id}`}>
                  <div className="button view-folder-btn">
                    View All
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "property"]'
  const allProperties = await sanityClient.fetch(query)

  return {
    props: {
      allProperties,
    },
  }
}

export default Folders
