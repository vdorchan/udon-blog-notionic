const arr = [
  {
    date: 111,
    title: '跟随我，我们皆为机械之子'
  },
  {
    date: 333,
    featured: 'Yes',
    title: 'react'
  },
  {
    date: 6666,
    title: 'react'
  },
  {
    date: 222,
    featured: 'Yes',
    title: 'react'
  }
]

const sort = (arr, key, dir) => {
  arr.sort((a, b) => {
    a = a[key] || ''
    b = b[key] || ''
    let compare = a > b

    compare = dir === 'descending' ? compare : !compare
    return compare ? -1 : 1
  })
}

sort(arr, 'date', 'descending')
// sort(arr, 'date', 'ascending')
sort(arr, 'featured', 'descending')
console.log(arr)
