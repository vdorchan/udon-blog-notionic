import Twemoji from 'react-twemoji'

export const Button = ({ active, children, data, onClick, ...props }) => {
  return (
    <Twemoji options={{ className: 'twemoji' }}>
      <div
        className={`flex cursor-pointer items-center py-1 px-4 font-medium rounded-lg whitespace-nowrap text-gray-400 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 ${
          active ? ' bg-gray-200 dark:bg-gray-600' : ''
        }`}
        onClick={() => onClick(data)}
        {...props}
      >
        {children}
      </div>
    </Twemoji>
  )
}
