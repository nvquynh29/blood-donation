import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import SearchResult from '../../../components/search-result'
import { getDonation, getDonationHistory } from '../../../api/donation'

function index({ data }) {
  const router = useRouter()
  if (!data) {
    useEffect(() => {
      router.push('/404')
    })
  }
  return (
    <div>
      <SearchResult data={data} />
    </div>
  )
}

index.getInitialProps = async (ctx) => {
  try {
    const { id } = ctx.query
    const res = await getDonationHistory(id)
    return { data: res.data }
  } catch (error) {
    console.log(error)
  }
  return {}
}

export default index
