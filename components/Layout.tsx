import React, { ReactNode } from "react"
import "./Layout.module.css"
import Link from "next/link"
import Head from "next/head"

type LayoutProps = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title }: LayoutProps) => (
  <>
    <Head>
      <title>Coutries Lists | {title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="layout">
      <header className="layout__header">
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
        </nav>
      </header>
      {children}
      {/* <footer>
        <hr />
        <span>Coutries Lists</span>
      </footer> */}
    </div>
  </>
)

export default Layout
