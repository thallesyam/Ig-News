import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { getPrismicClient } from '../../services/prismic'
import Posts, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { useRouter } from 'next/router'
import Post from '../../pages/posts/preview/[slug]'

const post = {
  slug: 'my-test-post',
  title: 'My test post',
  content: '<p>Post excerpt</p>',
  updatedAt: 'March, 10',
}

jest.mock('../../services/prismic')
jest.mock('next-auth/client')
jest.mock('next/router')

describe('Post Preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<Posts post={post} />)

    expect(screen.getByText('My test post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading')).toBeInTheDocument()
  })

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false,
    ] as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(<Post post={post} />)

    expect(pushMock).toHaveBeenCalledWith('/posts/my-test-post')
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My Test Post' }],
          content: [{ type: 'paragraph', text: 'My Test Post content' }],
        },
        last_publication_date: '04-01-2021',
      }),
    } as any)

    const response = await getStaticProps({
      params: {
        slug: 'my-test-post',
      },
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-test-post',
            title: 'My Test Post',
            content: '<p>My Test Post content</p>',
            updatedAt: '01 de abril de 2021',
          },
        },
      })
    )
  })
})
