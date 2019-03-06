import React, { useState, useEffect, useCallback } from 'react'
import styles from '../style/Common.module.scss'
import { Link } from 'gatsby'

const LOCAL_STORAGE_KEY = '_verycoolCookieBanner'

const CookieBanner = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  const hideCookieBanner = useCallback(() => {
    setShowCookieBanner(false)
    localStorage.setItem(LOCAL_STORAGE_KEY, true)
  }, [setShowCookieBanner])

  useEffect(() => {
    const didShowCookieBanner = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!didShowCookieBanner) {
      setShowCookieBanner(true)
    }
  }, [])

  return !showCookieBanner ? null : (
    <div className={styles.CookieBanner}>
      <div className={styles.BannerContent}>
        <span className={styles.BannerText}>
          You know the drill - we use cookies. One to be exact. That cool? Read
          more in our <Link to="/privacy-policy">privacy policy</Link>.
        </span>
        <button onClick={hideCookieBanner} className={styles.Button}>
          OK
        </button>
      </div>
    </div>
  )
}

export default CookieBanner
