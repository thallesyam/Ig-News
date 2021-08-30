import { SignInButton } from '../SignInButton/index'

import styles from './styles.module.scss'
import ActiveLink from '../ActiveLink'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <ActiveLink activeClassName={styles.active} href="/">
          <a className={styles.active}>
            <img src="/images/logo.svg" alt=" Ig.news" />
          </a>
        </ActiveLink>

        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
