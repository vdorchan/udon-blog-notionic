import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../Common/Button'
import styles from './style.module.css'

export const CategoriesBar = ({
  categories,
  className,
  onChange,
  ...props
}) => {
  const navRef = useRef()
  const [activeLink, setActiveLink] = useState(null)

  useEffect(() => {
    onChange?.(activeLink)
  }, [activeLink, onChange])

  useEffect(() => {
    const nav = navRef.current
    if (nav) {
      // xxx: 后续改写
      let navLinks = nav.querySelectorAll('li')

      navLinks.forEach(function (link) {
        link.addEventListener('click', (event) => {
          link.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
          })
        })
      })
    }
  }, [])

  return (
    <nav className={classNames(styles.nav, className)} ref={navRef} {...props}>
      <ul className={classNames(styles.container, 'gap-4 text-lg')}>
        {categories.map((category) => {
          const id = category.showAll ? null : category.title
          return (
            <li key={category.title} className={classNames(styles.link)}>
              <Button
                data={id}
                active={activeLink === id}
                onClick={setActiveLink}
              >
                <div className='mr-2 flex-shrink-0'>{category.icon}</div>
                {category.title}
                <div className='ml-2'>({category.count})</div>
              </Button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
