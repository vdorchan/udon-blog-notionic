import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { BigLogo } from './BigLogo'

export default function Loading({ notionSlug }) {
  const { locale } = useRouter()
  const [showNotion, setshowNotion] = useState(false)

  if (notionSlug) {
    setTimeout(() => {
      setshowNotion(true)
    }, 3000)
  }

  const t = lang[locale]
  return (
    <div className='py-6 sm:py-8 lg:py-12'>
      <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
        <div className='flex flex-col items-center'>
          <div className='inline-flex items-center gap-2.5 mb-8'>
            <BigLogo />
          </div>

          <div className='inline-flex items-center text-sm md:text-base font-semibold udivpercase mb-4'>
            <div className='lds-hourglass mr-2'></div>
            {t.ERROR.LOADING}
          </div>
          {showNotion && (
            <Link
              passHref
              href={`https://${BLOG.notionDomain}/${notionSlug}`}
              scroll={false}
              className='text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition duration-100'
            >
              <ExternalLinkIcon className='inline-block mb-1 h-5 w-5' />
              <span className='m-1'>{t.ERROR.TIMEOUT_TEXT}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// export default Loading
