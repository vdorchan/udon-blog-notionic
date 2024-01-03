import BLOG from '@/blog.config'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import FormattedDate from '@/components/Common/FormattedDate'
import { TagIcon } from '@heroicons/react/outline'

const BlogPost = ({ post }) => {
  // if no tags, use category
  const tags = post.tags?.length ? post.tags : post.category

  return (
    <motion.div>
      <Link passHref href={`${BLOG.path}/${post.slug}`} scroll={false}>
        <article
          key={post.id}
          className='group flex flex-col overflow-hidden relative mb-5 md:mb-8 cursor-pointer rounded-xl p-5'
        >
          <Image
            fill
            alt={`${post.title}`}
            src={post?.page_cover}
            className='w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200 px-5'
          />
          <div className='hidden md:block md-cover absolute inset-0'></div>
          <div className='md:hidden sm-cover absolute inset-0'></div>
          <div className='relative mt-auto'>
            <header className='flex flex-col justify-between md:flex-row md:items-baseline'>
              <h2 className='text-lg md:text-xl font-medium  text-black dark:text-gray-100'>
                {post.title}
              </h2>
              <span className='text-sm text-color-fix font-light flex-shrink-0 text-gray-600 dark:text-gray-300 font-serif italic'>
                <span>Posted by udonchan on </span>
                <FormattedDate date={post.date} />
              </span>
            </header>
            <div className='flex items-center mb-2 mt-1 gap-1'>
              {tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className='flex items-center text-xs text-gray-600 gap-1 dark:text-gray-400'
                >
                  <TagIcon className='text-xs' width={16} height={16} />
                  {tag}
                </span>
              ))}
            </div>
            <p className='font-light hidden md:block leading-7 text-gray-700 dark:text-gray-300 italic'>
              {post.summary}
            </p>
            {/* w-4/5  */}
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

export default BlogPost
