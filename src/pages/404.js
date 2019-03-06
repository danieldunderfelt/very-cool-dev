import React from 'react'
import Layout from '../components/Layout'
import commonStyles from '../style/Common.module.scss'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Layout>
    <div>
      <h1 className={commonStyles.PageHeading}>404, not cool!</h1>
      <p>
        We're all out of coolness on this page. Maybe check the front page? I
        hear they're getting regular shipments of it!
      </p>
      <p>
        <Link to="/">Go to the front page (or click the logo)</Link>
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
