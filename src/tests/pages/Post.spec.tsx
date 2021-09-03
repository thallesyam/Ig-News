import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { getSession } from 'next-auth/client'
import { getPrismicClient } from '../../services/prismic'
import Posts, { getServerSideProps } from '../../pages/posts/[slug]'

const post = {
  slug: 'my-test-post',
  title: 'My test post',
  content: '<p>Post excerpt</p>',
  updatedAt: 'March, 10',
}

jest.mock('../../services/prismic')
jest.mock('next-auth/client')

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Posts post={post} />)

    expect(screen.getByText('My test post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
  })

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: {
        slug: 'my-test-post',
      },
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        }),
      })
    )
  })

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession)

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

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any)

    const response = await getServerSideProps({
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
