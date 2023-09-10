import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

export default function PaginationPage() {
  const [pageNum, setPageNum] = useState(1)

  const { isLoading, data, isFetching } = useQuery(
    ['colors', pageNum],
    () => fetchColors(pageNum),
    {
      keepPreviousData: true,
    }
  )

  if (isLoading) return <h3>loading...</h3>

  return (
    <div>
      <h3>PaginationPage</h3>
      {data?.data.map((color) => {
        return (
          <div key={color.id}>
            <h2>
              {color.id}. {color.label}
            </h2>
          </div>
        )
      })}
      <div>
        <button
          onClick={() => setPageNum((page) => page - 1)}
          disabled={pageNum === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNum((page) => page + 1)}
          disabled={pageNum === 4}
        >
          Next Page
        </button>
      </div>
      {isFetching && 'isFetching Loading'}
    </div>
  )
}
