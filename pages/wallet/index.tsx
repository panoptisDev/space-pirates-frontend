import type { NextPage } from 'next'
import Head from 'next/head'
import { useTronWeb } from '../../contexts/TronWebContext'
import tokensList from '../../config/constants/tokensList.json'
import Image from 'next/image'
import {
  isBattlefield,
  isDecoration,
  isItem,
  isTitle,
  isToken,
} from '../../lib/tokens'
import WalletItem from '../../components/Wallet/WalletItem'

const Wallet: NextPage = () => {
  return (
    <div className="min-h-full p-5">
      <Head>
        <title>Space Pirates Wallet</title>
      </Head>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">Wallet</h1>
        <p className="text-xl italic">
          Check your tokens and collectibles balances
        </p>
      </div>
      <div className="flex flex-col gap-y-7 items-center justify-around">
        <WalletItem tabIndex={0} title="Tokens" predicate={isToken} />
        <WalletItem tabIndex={1} title="TRC20" />
        <WalletItem tabIndex={2} title="LP tokens" lp={true} />
        <WalletItem tabIndex={3} title="Items" predicate={isItem} />
        <WalletItem tabIndex={4} title="Titles" predicate={isTitle} />
        <WalletItem tabIndex={5} title="Decorations" predicate={isDecoration} />
        <WalletItem
          tabIndex={6}
          title="Battlefields"
          predicate={isBattlefield}
        />
      </div>
    </div>
  )
}

export default Wallet
