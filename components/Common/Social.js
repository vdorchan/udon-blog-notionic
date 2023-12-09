import Link from 'next/link'
import BLOG from '@/blog.config'

const Social = () => {
  return (
    <div className='flex gap-1 items-center'>
      🌐
      <div>:</div>
      <Link
        href={`${BLOG.socialLink.telegram}`}
        scroll={false}
        target='_blank'
        aria-label='Telegram'
        className='primary-color-with-hover transition duration-100 underline underline-offset-4'
      >
        Telegram
      </Link>
      /
      <Link
        href={`${BLOG.socialLink.twitter}`}
        scroll={false}
        target='_blank'
        aria-label='Twitter'
        className='primary-color-with-hover transition duration-100 primary underline underline-offset-4'
      >
        Twitter
      </Link>
      /
      <Link
        href={`${BLOG.socialLink.github}`}
        scroll={false}
        target='_blank'
        aria-label='Github'
        className='primary-color-with-hover transition duration-100 underline underline-offset-4'
      >
        Github
      </Link>
    </div>
  )
}

export default Social
