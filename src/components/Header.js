import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/verycooltech_logo.png'
import styles from '../style/Header.module.scss'
import LinkList from './LinkList'

const Header = class extends React.Component {
  render() {
    return (
      <nav className={styles.Header}>
        <div className={styles.HeaderContent}>
          <Link to="/" title="Logo" className={styles.Logo}>
            <h1>
              <img src={logo} alt="Very Cool" />
            </h1>
          </Link>
          <LinkList className={styles.HeaderLinkList} />
        </div>
      </nav>
    )
  }
}

export default Header
