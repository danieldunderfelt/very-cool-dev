import React from 'react'
import styles from '../style/Article.module.scss'
import { FiClock } from 'react-icons/fi'

export default function TimeDisplay({ date }) {
  return (
    <div className={styles.TimeDisplay}>
      <FiClock color="var(--grey)" /> {date}
    </div>
  )
}
