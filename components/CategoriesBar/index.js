import classNames from 'classnames'
import { useRef, useEffect, useMemo, useState } from 'react'
import styles from './style.module.css'
import { Button } from '../Common/Button'

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
          link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
        })
      })
    }
  }, [])

  return (
    <nav className={classNames(styles.nav, className)} ref={navRef} {...props}>
      <ul className={classNames(styles.container, 'gap-4 text-lg')}>
        {categories.map((category) => {
          return (
            <li key={category.title} className={classNames(styles.link)}>
              <Button
                data={category.showAll ? null : category.title}
                active={activeLink === category.title}
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
