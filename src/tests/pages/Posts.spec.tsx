import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { getPrismicClient } from '../../services/prismic'
import Posts, { getStaticProps } from '../../pages/posts'

const posts = [
  {
    slug: 'my-test-post',
    title: 'My test post',
    excerpt: 'Post excerpt',
    updatedAt: 'March, 10',
  },
]

jest.mock('../../services/prismic')

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My test post')).toBeInTheDocument()
  })

  it('loads intial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-test-post',
            data: {
              title: [{ type: 'heading', text: 'My Test Post' }],
              content: [{ type: 'paragraph', text: 'My Test Post content' }],
            },
            last_publication_date: '04-01-2021',
          },
        ],
      }),
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-test-post',
              title: 'My Test Post',
              excerpt: 'My Test Post content',
              updatedAt: '01 de abril de 2021',
            },
          ],
        },
      })
    )
  })
})
