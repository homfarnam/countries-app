import Image from "next/image"
import Link from "next/link"
import Layout from "../components/Layout"
import styles from "../styles/Home.module.css"

interface IndexProps {
  countries: any
}

const IndexPage: React.FC<IndexProps> = ({ countries }) => {
  return (
    <Layout title="All">
      <div>
        <h2 className={styles.title}>Countries Lists</h2>

        <div className={styles.countryContainer}>
          {countries.map(
            (country: {
              name: string
              flag: string
              population: number
              capital: string
            }) => {
              return (
                <Link key={country.name} href={`/country/${country.name}`}>
                  <div className={styles.countryCard}>
                    <Image
                      src={country.flag}
                      alt={country.name}
                      width={300}
                      height={200}
                    />
                    <h3>{country.name}</h3>
                    <p>
                      <strong>Population: </strong>
                      {country.population}
                    </p>
                    <p>
                      <strong>Capital:</strong> {country.capital}
                    </p>
                  </div>
                </Link>
              )
            }
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all")

  const data = await res.json()

  return {
    props: { countries: data },
  }
}

export default IndexPage
