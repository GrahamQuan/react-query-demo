import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export default function DependentQueriesPage({ email }) {
  console.log(1)
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  )
  console.log(2)
  const channelId = user?.data?.channelId
  const { data: channelInfo } = useQuery(
    ['channelInfo', channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  )
  console.log(3)
  console.log('channelInfo', channelInfo)
  return <div>{email}</div>
}
