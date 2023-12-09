import classnames from 'classnames'

export const Link = ({ children, href, active, className, ...props }) => {
  const _props = {
    className: classnames('udon-link', className, { active }),
    ...props
  }

  return href ? (
    <a {..._props}>{children}</a>
  ) : (
    <div className='udon-link' {..._props}>
      {children}
    </div>
  )
}
