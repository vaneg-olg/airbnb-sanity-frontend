import { sanityClient, urlFor } from "../sanity"
import Link from "next/link"
import { isMultiple } from "../utils"
import DashboardMap from "../components/DashboardMap"
import BookmarkButton from "../components/BookmarkButton"

const Home = ({ properties }) => {
  console.log(properties)
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <div className="feed-header">
              <h1>Places to stay near you</h1>
              <Link href="/bookmarks">
                <a className="bookmarks-link">My Bookmarks</a>
              </Link>
            </div>
            <div className="feed">
              {properties.map((property) => (
                <div key={property._id} className="card-wrapper">
                  <Link href={`property/${property.slug.current}`}>
                    <div className="card">
                      <img src={urlFor(property.mainImage)} />
                      <p>
                        {property.reviews.length} review
                        {isMultiple(property.reviews.length)}
                      </p>
                      <h3>{property.title}</h3>
                      <h3>
                        <b>£{property.pricePerNight}/per Night</b>
                      </h3>
                    </div>
                  </Link>
                  <BookmarkButton propertyId={property._id} propertyData={property} />
                </div>
              ))}
            </div>
          </div>
          <div className="map">
            <DashboardMap properties={properties} />
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]'
  const properties = await sanityClient.fetch(query)

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    }
  } else {
    return {
      props: {
        properties,
      },
    }
  }
}

export default Home
