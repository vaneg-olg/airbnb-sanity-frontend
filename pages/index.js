import { sanityClient, urlFor } from "../sanity"
import Link from "next/link"
import { isMultiple } from "../utils"
import DashboardMap from "../components/DashboardMap"
import BookmarkButton from "../components/BookmarkButton"
import styles from "../styles/Home.module.css"

const Home = ({ properties }) => {
  console.log(properties)
  return (
    <>
      {properties && (
        <div className={styles.main}>
          <div className={styles.feedContainer}>
            <h1>Places to stay near you</h1>
            <div className={styles.feed}>
              {properties.map((property) => (
                <div key={property._id} className={styles.cardWrapper}>
                  <Link href={`property/${property.slug.current}`}>
                    <div className={styles.card}>
                      <img src={urlFor(property.mainImage)} />
                      <p className={styles.reviewCount}>
                        {property.reviews.length} review
                        {isMultiple(property.reviews.length)}
                      </p>
                      <h3>{property.title}</h3>
                      <h3>
                        <b>£{property.pricePerNight}/per Night</b>
                      </h3>
                    </div>
                  </Link>
                  <BookmarkButton property={property} showLabel={false} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.map}>
            <DashboardMap properties={properties} />
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[ _type == "property"]{_id, _type, title, slug, mainImage, pricePerNight, reviews}'
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
