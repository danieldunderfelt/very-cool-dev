import React from 'react'
import styles from '../style/Header.module.scss'
import { Link } from 'gatsby'
import { FaDiscord, FaTwitter, FaMobileAlt, FaUser } from 'react-icons/fa'
import { FiMail, FiChevronRight } from 'react-icons/fi'

const LinkList = ({ className }) => {
  return (
    <div className={className}>
      <h5 className={styles.LinkListHeading}>More VERYCOOL</h5>
      <ul className={ styles.LinkList }>
        <li>
          <a
            href="https://verycool.tech"
            target="_blank"
            rel="noopener noreferrer">
            <FaMobileAlt /> verycool.tech
          </a>
        </li>
        <li>
          <a
            href="https://danieldunderfelt.com"
            target="_blank"
            rel="noopener noreferrer">
            <FaUser /> danieldunderfelt.com
          </a>
        </li>
      </ul>
      <h5 className={styles.LinkListHeading}>Find VERYCOOL.dev on</h5>
      <ul className={styles.LinkList}>
        <li>
          <a
            href="https://twitter.com/verycooltech"
            target="_blank"
            rel="noopener noreferrer">
            <FaTwitter /> @verycooltech
          </a>
        </li>
        <li>
          <a
            href="https://discord.gg/rqWmCnX"
            target="_blank"
            rel="noopener noreferrer">
            <FaDiscord /> Verycool on Discord
          </a>
        </li>
        <li>
          <a
            href="mailto:editor@verycool.dev"
            target="_blank"
            rel="noopener noreferrer">
            <FiMail /> editor@verycool.dev
          </a>
        </li>
      </ul>
      <ul className={styles.PageList}>
        <li>
          <Link to="/articles/2019-03-07-welcome-to-very-cool/">
            <FiChevronRight size="18px" /> Introduction post
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FiChevronRight size="18px" /> About
          </Link>
        </li>
        <li>
          <Link to="/privacy-policy">
            <FiChevronRight size="18px" /> Privacy policy
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default LinkList
