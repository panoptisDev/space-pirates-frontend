import type { NextPage } from 'next'
import Head from 'next/head'
import FaucetCard from '../../components/Faucet/FaucetCard'

const Faucet: NextPage = () => {
  const tokens = [
    { id: 1, name: 'DOUBLOONS', maxAmount: 10000 },
    { id: 2, name: 'ASTEROIDS', maxAmount: 10000 },
    { id: 3, name: 'Breeding Gems', maxAmount: 10 },
    { id: 4, name: 'Evocations Gems', maxAmount: 10 },
  ]

  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Faucet</title>
      </Head>
      <div className="text-center mb-8">
        <p className="text-5xl font-bold text-primary mb-2">
          Space Pirates Faucet
        </p>
        <p className="text-xl italic">
          Start here! Get your tokens and start playing in testnet!
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 gap-4">
          {tokens.map((token) => (
            <FaucetCard
              key={token.id}
              id={token.id}
              name={token.name}
              maxAmount={token.maxAmount}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faucet
