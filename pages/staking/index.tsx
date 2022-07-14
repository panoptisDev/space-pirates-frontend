import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import NavTab from '../../components/layout/NavTab'
import { NextPageWithLayout } from '../_app'

const Staking: NextPageWithLayout = () => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Staking</title>
      </Head>
    </div>
  )
}

Staking.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <NavTab page="earn" />
      {page}
    </Layout>
  )
}

export default Staking
