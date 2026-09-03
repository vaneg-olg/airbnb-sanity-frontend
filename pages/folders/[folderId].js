import React, { useContext } from 'react'
import Link from 'next/link'
import { BookmarkContext } from '../../context/BookmarkContext'
import { sanityClient, urlFor } from '../../sanity'
import { isMultiple } from '../../utils'

const FolderDetail = ({ folder, allProperties }) => {
  const { bookmarks, removeBookmark } = useContext(BookmarkContext)

  if (!folder) {
    return (
      <div className="container">
        <h1>Folder not found</h1>
        <Link href="/bookmarks">
          <div className="button">Back to Bookmarks</div>
        </Link>
      </div>
    )
  }

  const propertyIds = bookmarks[folder.id] || []
  const propertiesInFolder = allProperties.filter(p => propertyIds.includes(p._id))

  const handleRemoveBookmark = (propertyId) => {
    removeBookmark(propertyId, folder.id)
  }

  return (
    <div className="container">
      <div className="folder-detail-header">
        <Link href="/bookmarks">
          <a className="back-link">← Back to Bookmarks</a>
        </Link>
        <h1>{folder.name}</h1>
        <p>{propertiesInFolder.length} listing{isMultiple(propertiesInFolder.length)}</p>
      </div>

      {propertiesInFolder.length === 0 ? (
        <div className="no-bookmarks-message">
          <p>No listings bookmarked in this folder yet.</p>
          <Link href="/">
            <div className="button">Browse Listings</div>
          </Link>
        </div>
      ) : (
        <div className="folder-listings">
          {propertiesInFolder.map(property => (
            <div key={property._id} className="folder-listing-card">
              <Link href={`/property/${property.slug.current}`}>
                <div className="listing-image">
                  <img src={urlFor(property.mainImage).width(300).height(250).url()} alt={property.title} />
                </div>
              </Link>
              <div className="listing-info">
                <Link href={`/property/${property.slug.current}`}>
                  <h3>{property.title}</h3>
                </Link>
                <p className="reviews">
                  {property.reviews.length} review{isMultiple(property.reviews.length)}
                </p>
                <p className="price">£{property.pricePerNight}/per Night</p>
                <button
                  className="remove-bookmark-btn"
                  onClick={() => handleRemoveBookmark(property._id)}
                >
                  Remove from folder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { folderId } = context.params
  const query = '*[_type == "property"]'
  const allProperties = await sanityClient.fetch(query)

  // Note: The folder object will be hydrated on the client side from context
  // For now, we just return the folderId so the client can look it up
  return {
    props: {
      folder: { id: folderId },
      allProperties,
    },
  }
}

export default FolderDetail
