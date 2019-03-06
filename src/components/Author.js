import React from 'react'
import styles from '../style/Article.module.scss'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'

export default function Author({ author }) {
  const { name, avatar, nickname } = author

  return (
    <Link to={`author/${kebabCase(nickname)}`} className={styles.AuthorDisplay}>
      <img alt={name} src={avatar} /> {name}
    </Link>
  )
}
