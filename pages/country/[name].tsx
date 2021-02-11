import { useEffect, useState } from "react"
import Image from "next/image"
import Layout from "../../components/Layout"
import styles from "../../styles/Country.module.css"

interface NameProps {
  country: any
}

const CountryName: React.FC<NameProps> = ({ country }) => {
  const [name, setName] = useState<string>("")
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    country.map((item: { name: string }) => {
      setName(item.name)
    })
  }, [name])

  useEffect(() => {
    country.map((item: { languages: any }) => {
      setLanguages(item.languages)
    })
  }, [languages])

  console.log(languages)

  return (
    <Layout title={name}>
      {country.map(
        (item: {
          name: string
          flag: string
          population: number
          capital: string
          nativeName: string
          region: string
        }) => {
          return (
            <div key={item.name} className={styles.country}>
              <div>
                <Image
                  src={item.flag}
                  width={600}
                  height={400}
                  alt={item.name}
                />
              </div>
              <div className={styles.countryData}>
                <div className={styles.details}>
                  <p>
                    <strong>Name: </strong>
                    {item.name}
                  </p>
                  <p>
                    <strong>Population: </strong>
                    {item.population}
                  </p>
                  <p>
                    <strong>Capital: </strong>
                    {item.capital}
                  </p>
                </div>

                <div className={styles.details}>
                  <p>
                    <strong>Native name: </strong>
                    {item.nativeName}
                  </p>
                  <p>
                    <strong>Region: </strong>
                    {item.region}
                  </p>

                  <p>
                    <span>
                      <strong>Languages: </strong>
                    </span>
                    {languages.map((item: { name: string }) => (
                      <span key={item.name}>{item.name}</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          )
        }
      )}
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all")

  const data = await res.json()

  const countries = data.map((country: { name: string }) => {
    return {
      params: {
        name: country.name,
      },
    }
  })

  return {
    paths: countries,
    fallback: false,
  }
}

export const getStaticProps = async (context: any) => {
  const name = context.params.name
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${name}`)

  const data = await res.json()

  return {
    props: {
      country: data,
    },
  }
}

export default CountryName
