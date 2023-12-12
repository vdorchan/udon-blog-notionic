import classNames from 'classnames'
import { useRef, useEffect, useMemo, useState } from 'react'
import styles from './style.module.css'
import { Button } from '../Common/Button'
import { categories as categoriesIcons } from '@/blog.config'

export const CategoriesBar = ({
  categories: categoriesObj,
  className,
  onChange,
  ...props
}) => {
  const navRef = useRef()
  const categories = useMemo(
    () => [
      [
        null,
        Object.values(categoriesObj).reduce((total, cur) => total + cur),
        0
      ],
      ...Object.entries(categoriesObj)
    ],
    [categoriesObj]
  )
  const [activeLink, setActiveLink] = useState(null)

  useEffect(() => {
    onChange(activeLink)
  }, [activeLink])

  useEffect(() => {
    const nav = navRef.current
    if (nav) {
      // xxx: 后续改写
      let navLinks = nav.querySelectorAll('li')
      let activeLink = navLinks[0]

      navLinks.forEach(function (link) {
        link.addEventListener('click', (event) => {
          navLinks.forEach(function (link) {
            link.classList.remove('active')
          })
          link.classList.add('active')
          link.scrollIntoView({ behavior: 'smooth', inline: 'center' })
        })
      })
    }
  }, [])

  return (
    <nav className={classNames(styles.nav, className)} ref={navRef} {...props}>
      <ul className={classNames(styles.container, 'gap-4 text-lg')}>
        {categories.map(([category, count]) => {
          const categoryLabel = category || '全部'

          return (
            <li key={categoryLabel} className={classNames(styles.link)}>
              <Button
                data={category}
                active={activeLink === category}
                onClick={setActiveLink}
              >
                <div className='mr-2 flex-shrink-0'>
                  {categoriesIcons[categoryLabel]}
                </div>
                {categoryLabel}
                <div className='ml-2'>({count})</div>
              </Button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
