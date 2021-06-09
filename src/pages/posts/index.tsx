import React from 'react'
import styles from './styles.module.scss'
import Head from 'next/head'

const Posts = () => {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              cumque in numquam delectus asperiores quam aliquam suscipit sit
              quasi officia. Explicabo laboriosam dolorum a asperiores optio
              porro suscipit fugit consequuntur!
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              cumque in numquam delectus asperiores quam aliquam suscipit sit
              quasi officia. Explicabo laboriosam dolorum a asperiores optio
              porro suscipit fugit consequuntur!
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              cumque in numquam delectus asperiores quam aliquam suscipit sit
              quasi officia. Explicabo laboriosam dolorum a asperiores optio
              porro suscipit fugit consequuntur!
            </p>
          </a>
        </div>
      </main>
    </>
  )
}

export default Posts
