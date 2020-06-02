import React from 'react'
import { useRouter } from 'next/router'

const Home: React.FC = () => {
  const router = useRouter()
  router.replace('/files')

  return (
    <div>

    </div>
  )
}

export default Home
