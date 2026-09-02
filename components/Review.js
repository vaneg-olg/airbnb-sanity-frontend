import { urlFor } from "../sanity"
import { useState } from "react"

const Review = ({ review, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = () => {
    setIsDeleting(true)
  }

  const confirmDelete = () => {
    setIsDeleting(false)
    if (onDelete) {
      onDelete(review._key)
    }
  }

  const cancelDelete = () => {
    setIsDeleting(false)
  }

  return (
    <div className="review-box">
      <h1>{review.rating}</h1>
      <h2>{review.traveller.name}</h2>
      <img
        src={urlFor(review.traveller.image)
          .width(50)
          .height(50)
          .crop("focalpoint")
          .auto("format")}
      />
      <button onClick={handleDeleteClick} className="delete-button">
        Delete Review
      </button>

      {isDeleting && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>Are you sure you want to delete this review?</p>
            <div className="confirmation-buttons">
              <button onClick={confirmDelete} className="confirm-button">
                Delete
              </button>
              <button onClick={cancelDelete} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Review
