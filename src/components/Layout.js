import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import classnames from 'classnames'
import Header from './Header'
import '../style/index.scss'
import styles from '../style/Layout.module.scss'
import LinkList from './LinkList'
import CookieBanner from './CookieBanner'

const TemplateWrapper = ({ children, topSpace = false }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet>
          <html lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-32x32.png?v=1"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/img/favicon-16x16.png?v=1"
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href="/img/safari-pinned-tab.svg"
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />
          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
        </Helmet>
        <div className={styles.Viewport}>
          <div
            className={classnames(
              styles.LayoutWrapper,
              topSpace ? styles.TopSpace : ''
            )}>
            <Header />
            {children}
            <LinkList className={styles.FooterLinkList} />
            <CookieBanner />
          </div>
        </div>
      </>
    )}
  />
)

export default TemplateWrapper
