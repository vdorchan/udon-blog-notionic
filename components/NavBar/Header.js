import { useEffect, useCallback, useState, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import {
  HomeIcon,
  NewspaperIcon,
  CollectionIcon,
  SparklesIcon,
  SearchIcon,
  MenuIcon,
  UserIcon
} from '@heroicons/react/outline'
import Social from '../Common/Social.js'
import ThemeSwitcher from './ThemeSwitcher.js'
import LangSwitcher from './LangSwitcher.js'
import Logo from '@/components/Common/Logo'
import { motion } from 'framer-motion'
import { Link as ButtonLink } from '@/components/ui/Link'
import classNames from 'classnames'

const NavBar = () => {
  const router = useRouter()
  const { locale } = useRouter()
  const t = lang[locale]
  const [showMenu, setShowMenu] = useState(false)

  let activeMenu = ''
  if (router.query.slug) {
    activeMenu = '/' + router.query.slug
  } else {
    activeMenu = router.pathname
  }

  const links = [
    {
      id: 0,
      name: t.NAV.INDEX,
      to: BLOG.path || '/',
      icon: <HomeIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 1,
      name: t.NAV.NEWSLETTER,
      to: '/newsletter',
      icon: <NewspaperIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.newsletter
    },
    {
      id: 2,
      name: t.NAV.NOTES,
      to: '/notes',
      icon: <CollectionIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.notes
    },
    {
      id: 3,
      name: t.NAV.PROJECTS,
      to: '/projects',
      icon: <SparklesIcon className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.projects
    },
    {
      id: 4,
      name: t.NAV.SEARCH,
      to: '/search',
      icon: <SearchIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 5,
      name: t.NAV.ABOUT,
      to: '/about',
      icon: <UserIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    }
  ]
  return (
    <motion.div className='flex'>
      {/* Desktop Menu */}
      <ul className='items-center hidden md:flex md:gap-4'>
        {links.map(
          (link) =>
            link.show && (
              <Link passHref href={link.to} key={link.id} scroll={false}>
                <ButtonLink active={activeMenu === link.to}>
                  {link.icon}
                  <span className='inline-block m-1'>{link.name}</span>
                </ButtonLink>
              </Link>
            )
        )}
      </ul>

      <div className='nav-func-btn block'>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>

      {/* Mobile Phone Menu */}
      <div className='md:hidden mr-2 block '>
        <button
          type='button'
          aria-label='Menu'
          onClick={() => setShowMenu((showMenu) => !showMenu)}
          className='hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block p-2 -mr-3 md:pb-3'
        >
          <MenuIcon className='inline-block mb-1 h-5 w-5' />
        </button>
        {showMenu && (
          <div className='absolute right-0 w-40 mr-4 mt-2 bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600 rounded-md shadow-lg outline-none'>
            <div className='py-1'>
              {links.map(
                (link) =>
                  link.show && (
                    <Link passHref key={link.id} href={link.to} scroll={false}>
                      <button
                        onClick={() => setShowMenu((showMenu) => !showMenu)}
                        className='text-left hover:bg-gray-100 dark:hover:bg-gray-600 font-light block justify-between w-full px-4 py-2 leading-5'
                      >
                        {link.icon}
                        <span className='m-1'>{link.name}</span>
                      </button>
                    </Link>
                  )
              )}
            </div>
            <div className='px-4 py-4'>
              <Social />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const Header = ({ navBarTitle, fullWidth, fixedTop }) => {
  const [showTitle, setShowTitle] = useState(false)
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(/** @type {HTMLDivElement} */ undefined)
  const sentinelRef = useRef(/** @type {HTMLDivElement} */ undefined)
  const [inTop, setInTop] = useState(true)

  useEffect(() => {
    if (fixedTop && navRef.current) {
      const nav = navRef.current
      let prevScrollpos = window.pageYOffset
      setInTop(window.pageYOffset === 0)
      function onScroll() {
        const currentScrollPos = window.pageYOffset
        if (prevScrollpos > currentScrollPos) {
          nav.style.top = '0'
        } else {
          nav.style.top = '-64px'
        }
        prevScrollpos = currentScrollPos
        setInTop(window.pageYOffset === 0)
      }

      window.addEventListener('scroll', onScroll)

      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    }
  }, [fixedTop])

  const handler = useCallback(
    ([entry]) => {
      if (fixedTop) return
      if (useSticky && navRef.current) {
        navRef.current?.classList.toggle(
          'sticky-nav-full',
          !entry.isIntersecting
        )
      } else {
        navRef.current?.classList.add('remove-sticky')
      }
    },
    [useSticky, fixedTop]
  )

  useEffect(() => {
    const sentinelEl = sentinelRef.current
    const observer = new window.IntersectionObserver(handler)
    observer.observe(sentinelEl)

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        setShowTitle(true)
      } else {
        setShowTitle(false)
      }
    })
    return () => {
      sentinelEl && observer.unobserve(sentinelEl)
    }
  }, [handler, sentinelRef])

  // console.log(fixedTop, inTop,fixedTop && (inTop ? 'dark in-top' : 'bg-white') )

  return (
    <>
      <div
        className={classNames('observer-element', !fixedTop && 'h-4 md:h-12')}
        ref={sentinelRef}
      ></div>
      <div
        className={classNames(
          'sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center py-8 bg-opacity-60',
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24',
          fixedTop && 'fixed-top sticky-nav-full',
          !fixedTop && 'mb-2 md:mb-12',
          fixedTop && (inTop ? 'in-top' : 'bg-white'),
          navBarTitle && fixedTop && inTop && 'dark'
        )}
        id='sticky-nav'
        ref={navRef}
      >
        <div className='flex items-center'>
          <Link passHref href='/' scroll={false} aria-label={BLOG.title}>
            <motion.div>
              <Logo className='h-8 hover:text-blue-500 dark:hover:text-blue-500 fill-current rounded-lg' />
            </motion.div>
          </Link>
          {navBarTitle ? (
            <p
              className={`ml-2 font-medium ${
                !showTitle ? 'hidden' : 'hidden xl:block'
              }`}
            >
              {navBarTitle}
            </p>
          ) : (
            <p
              className={`ml-2 font-medium ${
                !showTitle ? 'hidden' : 'hidden xl:block'
              }`}
            >
              {/* {BLOG.title},{' '} */}
              <span className='font-normal'>{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
