import Image from 'next/image'
import FormattedDate from './Common/FormattedDate'
import TagItem from './Common/TagItem'

export const PostHeader = ({ frontMatter }) => {
  return (
    <header className='w-full relative z-0 row mb-4'>
      <div
        className='absolute w-full'
        style={{ top: '-5.5rem', height: 'calc(100% + 5.5rem)' }}
      >
        <Image
          fill
          alt={`${frontMatter.title}`}
          src={frontMatter?.page_cover}
          className='w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200 brightness-50	'
        />
      </div>
      <div className='max-w-5xl m-auto flex flex-col items-start pt-20 pb-36 relative pl-40'>
        {frontMatter.type[0] !== 'Page' && (
          <nav className='flex mb-2 items-start text-gray-500 dark:text-gray-400'>
            {frontMatter.tags && (
              <div className='flex flex-nowrap max-w-full overflow-x-auto article-tags'>
                {frontMatter.tags.map((tag) => (
                  <TagItem key={tag} tag={tag} />
                ))}
              </div>
            )}
          </nav>
        )}
        <h2 className='text-lg md:text-5xl font-medium  text-gray-50 dark:text-gray-100 mb-4'>
          {frontMatter.title}
        </h2>
        <span className='text-sm text-color-fix font-light flex-shrink-0 text-gray-50 dark:text-gray-300 font-serif italic'>
          <span>Posted by on </span>
          <FormattedDate date={frontMatter.date} />
        </span>
      </div>
    </header>
  )
}
