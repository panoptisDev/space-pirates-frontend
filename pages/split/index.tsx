import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { NextPageWithLayout } from '../_app'

import CardContainer from '../../components/Trade/CardContainer'
import Layout from '../../components/layout/Layout'
import NavTab from '../../components/layout/NavTab'
import LoadingButton from '../../components/layout/LoadingButton'
import InfoBanner from '../../components/layout/InfoBanner'
import ArrowsDown from '../../components/icons/ArrowsDown'
import TokenInput from '../../components/Trade/TokenInput'
import { useAlert } from '../../contexts/AlertContext'
import { useTronWeb } from '../../contexts/TronWebContext'

import tokenList from '../../config/constants/tokensList.json'
import AsteroidsSplit from '../../config/artifacts/AsteroidsSplitContract.json'
import SpacePiratesTokens from '../../config/artifacts/SpacePiratesTokens.json'

import { addresses } from '../../config/addresses'

const Split: NextPageWithLayout = () => {
  const [splitAmount, setSplitAmount] = useState('')
  const [mergeAmount, setMergeAmount] = useState('')
  const [splitLoading, setSplitLoading] = useState(false)
  const [mergeLoading, setMergeLoading] = useState(false)

  const { toggleAlert } = useAlert()
  const { tronWeb } = useTronWeb()

  const onSplitTokens = async () => {
    setSplitLoading(true)

    try {
      const spacePiratesTokens = await tronWeb.contract(
        SpacePiratesTokens.abi,
        addresses.shasta.tokensContract,
      )

      await spacePiratesTokens
        .setApprovalForAll(addresses.shasta.splitContract, true)
        .send()

      const asteroidsSplit = await tronWeb.contract(
        AsteroidsSplit.abi,
        addresses.shasta.splitContract,
      )

      await asteroidsSplit
        .splitAsteroids(splitAmount)
        .send({ shouldPoolResponse: true })

      toggleAlert(
        `Successfully minted ${splitAmount} veASTR and stkASTR`,
        'success',
      )
    } catch (err) {
      console.log(err)
      toggleAlert('Error during the split. Try again', 'error')
    } finally {
      setSplitLoading(false)
    }
  }

  const onMergeTokens = async () => {
    setMergeLoading(true)

    try {
      const asteroidsSplit = await tronWeb.contract(
        AsteroidsSplit.abi,
        addresses.shasta.splitContract,
      )

      await asteroidsSplit
        .mergeAsteroids(mergeAmount)
        .send({ shouldPoolResponse: true })

      toggleAlert(`Successfully redeemed ${mergeAmount} ASTR`, 'success')
    } catch (err) {
      toggleAlert('Error during the split. Try again', 'error')
    } finally {
      setMergeLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center gap-20 py-20">
      <Head>
        <title>Space Pirates Split</title>
      </Head>
      <CardContainer
        title="Split"
        subtitle="Split your ASTR into stk-ASTR and ve-ASTR"
      >
        <div className="text-primary relative m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="330.274"
            height="363"
            viewBox="0 0 330.274 363"
          >
            <g transform="translate(-1083.624 -173.475)">
              <path
                d="M630.124,165.2a54.5,54.5,0,1,1-54.5,54.5,54.5,54.5,0,0,1,54.5-54.5"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                className="fill-current"
                d="M689.874,114.475h46a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-46a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(508 135)"
              />
              <path
                d="M694.824,131.575h2.416v-7.264l3.12,4.736h.064l3.152-4.784v7.312h2.448v-11.2h-2.656l-2.944,4.736-2.944-4.736h-2.656Zm13.7,0h2.464v-11.2h-2.464Zm4.963,0h2.432v-7.12l5.424,7.12h2.1v-11.2H721.01v6.9l-5.248-6.9H713.49Zm14.949,0H730.9v-8.928h3.408v-2.272h-9.28v2.272h3.408Z"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                className="fill-current"
                d="M743.648,241.2h46a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-46a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(508 135)"
              />
              <path
                d="M748.6,258.3h2.416v-7.264l3.12,4.736h.064l3.152-4.784V258.3H759.8V247.1h-2.656l-2.944,4.736-2.944-4.736H748.6Zm13.7,0h2.464V247.1H762.3Zm4.963,0H769.7v-7.12l5.424,7.12h2.1V247.1h-2.432V254l-5.248-6.9h-2.272Zm14.949,0h2.464v-8.928h3.408V247.1H778.8v2.272h3.408Z"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M741.148,175.2h51a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-51a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(508 135)"
                fill="#c2c2c2"
              />
              <path
                d="M744.52,192.2h5.328c2.528,0,4.192-1.024,4.192-3.072V189.1a2.737,2.737,0,0,0-2.1-2.752,2.6,2.6,0,0,0,1.472-2.416V183.9a2.569,2.569,0,0,0-.768-1.9A4.044,4.044,0,0,0,749.72,181h-5.2Zm6.448-7.856c0,.832-.688,1.184-1.776,1.184H746.92V183.16h2.432c1.04,0,1.616.416,1.616,1.152Zm.624,4.448v.032c0,.832-.656,1.216-1.744,1.216H746.92v-2.464h2.848c1.264,0,1.824.464,1.824,1.216m8.847,3.584c3.008,0,4.912-1.664,4.912-5.056V181h-2.464v6.416c0,1.776-.912,2.688-2.416,2.688s-2.416-.944-2.416-2.768V181h-2.464v6.4c0,3.3,1.84,4.976,4.848,4.976m7.122-.176h2.464v-3.584h1.936l2.4,3.584h2.88l-2.736-4a3.478,3.478,0,0,0,2.4-3.472V184.7a3.516,3.516,0,0,0-.96-2.56A4.463,4.463,0,0,0,772.681,181h-5.12Zm2.464-5.76v-3.216h2.448c1.2,0,1.936.544,1.936,1.6v.032c0,.944-.688,1.584-1.888,1.584Zm8.8,5.76h2.432v-7.12l5.424,7.12h2.1V181h-2.432v6.9l-5.248-6.9h-2.272Z"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M687.374,302.475h51a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-51a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(508 135)"
                fill="#c2c2c2"
              />
              <path
                d="M690.746,319.475h5.328c2.528,0,4.192-1.024,4.192-3.072v-.032a2.737,2.737,0,0,0-2.1-2.752,2.6,2.6,0,0,0,1.472-2.416v-.032a2.569,2.569,0,0,0-.768-1.9,4.044,4.044,0,0,0-2.928-.992h-5.2Zm6.448-7.856c0,.832-.688,1.184-1.776,1.184h-2.272v-2.368h2.432c1.04,0,1.616.416,1.616,1.152Zm.624,4.448v.032c0,.832-.656,1.216-1.744,1.216h-2.928v-2.464h2.848c1.264,0,1.824.464,1.824,1.216m8.847,3.584c3.008,0,4.912-1.664,4.912-5.056v-6.32h-2.464v6.416c0,1.776-.912,2.688-2.416,2.688s-2.416-.944-2.416-2.768v-6.336h-2.464v6.4c0,3.3,1.84,4.976,4.848,4.976m7.122-.176h2.464v-3.584h1.936l2.4,3.584h2.88l-2.736-4a3.478,3.478,0,0,0,2.4-3.472v-.032a3.516,3.516,0,0,0-.96-2.56,4.463,4.463,0,0,0-3.264-1.136h-5.12Zm2.464-5.76V310.5H718.7c1.2,0,1.936.544,1.936,1.6v.032c0,.944-.688,1.584-1.888,1.584Zm8.8,5.76h2.432v-7.12l5.424,7.12H735v-11.2h-2.432v6.9l-5.248-6.9h-2.272Z"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M849.4,38.475a54.5,54.5,0,1,1-54.5,54.5,54.5,54.5,0,0,1,54.5-54.5"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M851.4,292.475a54.5,54.5,0,1,1-54.5,54.5,54.5,54.5,0,0,1,54.5-54.5"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                className="fill-current"
                d="M796.541,117.538a1,1,0,0,0-.707-1.225l-8.694-2.329a1,1,0,0,0-.517,1.932l7.727,2.07-2.07,7.728a1,1,0,1,0,1.931.517Zm-1.466-1.125-116.913,67.5,1,1.732,116.913-67.5Z"
                transform="translate(508 135)"
              />
              <path
                d="M683.7,194.913a1,1,0,0,0,.707,1.224l8.694,2.33a1,1,0,0,0,.517-1.932l-7.728-2.071,2.071-7.727a1,1,0,1,0-1.932-.518ZM799.355,127.8a1,1,0,0,0,1,1.732Zm-2.439,3.718a1,1,0,0,0-1-1.733Zm-4.438.253a1,1,0,1,0,1,1.731Zm-2.439,3.717a1,1,0,1,0-1-1.732Zm-4.439.253a1,1,0,0,0,1,1.733Zm-2.438,3.718a1,1,0,0,0-1-1.733Zm-4.439.253a1,1,0,1,0,1,1.732Zm-2.438,3.717a1,1,0,1,0-1-1.732Zm-4.439.253a1,1,0,0,0,1,1.733Zm-2.439,3.718a1,1,0,1,0-1-1.732Zm-4.438.253a1,1,0,0,0,1,1.732Zm-2.439,3.718a1,1,0,0,0-1-1.733Zm-4.438.252a1,1,0,0,0,1,1.733Zm-2.439,3.718a1,1,0,0,0-1-1.732Zm-4.439.253a1,1,0,0,0,1,1.733Zm-2.438,3.718a1,1,0,0,0-1-1.733Zm-4.439.253a1,1,0,0,0,1,1.732ZM741.9,163.28a1,1,0,1,0-1-1.732Zm-4.439.253a1,1,0,0,0,1,1.733Zm-2.439,3.718a1,1,0,1,0-1-1.732Zm-4.439.253a1,1,0,0,0,1,1.732Zm-2.439,3.718a1,1,0,1,0-1-1.733Zm-4.438.252a1,1,0,0,0,1,1.733Zm-2.439,3.718a1,1,0,1,0-1-1.732Zm-4.438.253a1,1,0,1,0,1,1.732Zm-2.439,3.718a1,1,0,0,0-1-1.733Zm-4.439.253a1,1,0,1,0,1,1.732Zm-2.438,3.717a1,1,0,0,0-1-1.732Zm-4.439.253a1,1,0,0,0,1,1.733Zm-2.438,3.718a1,1,0,0,0-1-1.733Zm-4.439.253a1,1,0,0,0,1,1.732Zm-2.439,3.718a1,1,0,0,0-1-1.733Zm-4.438.252a1,1,0,0,0,1,1.733Zm-2.439,3.718a1,1,0,0,0-1-1.732Zm114.194-68.24-1.719.993,1,1.732,1.719-.992Zm-5.158,2.978-3.438,1.986,1,1.731,3.438-1.984Zm-6.877,3.971-3.439,1.985,1,1.733,3.439-1.986Zm-6.877,3.97-3.439,1.986,1,1.732,3.439-1.985Zm-6.877,3.971-3.439,1.985,1,1.733,3.439-1.986Zm-6.878,3.971-3.438,1.985,1,1.732,3.438-1.985Zm-6.877,3.97-3.438,1.985,1,1.733,3.438-1.985Zm-6.877,3.971-3.439,1.985,1,1.733,3.439-1.986Zm-6.877,3.97-3.439,1.986,1,1.732,3.439-1.985Zm-6.877,3.971-3.439,1.985,1,1.733,3.439-1.986Zm-6.878,3.971-3.439,1.985,1,1.732,3.439-1.985Zm-6.878,3.97-3.438,1.985,1,1.733,3.438-1.985Zm-6.877,3.971-3.438,1.985,1,1.732,3.438-1.985Zm-6.877,3.97-3.439,1.986,1,1.732,3.439-1.985Zm-6.877,3.971-3.439,1.985,1,1.733,3.439-1.986Zm-6.877,3.97-3.439,1.986,1,1.732,3.439-1.985Zm-6.878,3.971-3.438,1.985,1,1.733,3.438-1.985Zm-6.877,3.971-1.719.992,1,1.733,1.719-.993Z"
                transform="translate(508 135)"
                fill="#c2c2c2"
              />
              <path
                className="fill-current"
                d="M801.864,312.745a1,1,0,0,0,.707-1.225l-2.33-8.693a1,1,0,0,0-1.931.517l2.07,7.728-7.727,2.071a1,1,0,1,0,.517,1.931Zm.241-1.832-116.913-67.5-1,1.732,116.913,67.5Z"
                transform="translate(508 135)"
              />
              <path
                d="M678.432,253.706a1,1,0,0,0-.707,1.224l2.329,8.694a1,1,0,0,0,1.932-.518l-2.071-7.727,7.728-2.071a1,1,0,0,0-.517-1.932Zm115.953,66.607a1,1,0,1,0-1,1.732Zm-4.439-.253a1,1,0,1,0,1-1.732Zm-2.438-3.718a1,1,0,0,0-1,1.733Zm-4.439-.253a1,1,0,1,0,1-1.732Zm-2.439-3.718a1,1,0,0,0-1,1.733Zm-4.438-.252a1,1,0,0,0,1-1.732Zm-2.439-3.718a1,1,0,0,0-1,1.732Zm-4.438-.253a1,1,0,1,0,1-1.732Zm-2.439-3.717a1,1,0,0,0-1,1.732Zm-4.439-.254a1,1,0,0,0,1-1.732ZM760,300.46a1,1,0,1,0-1,1.732Zm-4.439-.253a1,1,0,1,0,1-1.732Zm-2.438-3.718a1,1,0,0,0-1,1.733Zm-4.439-.253a1,1,0,1,0,1-1.732Zm-2.439-3.717a1,1,0,1,0-1,1.732Zm-4.438-.253a1,1,0,0,0,1-1.733Zm-2.439-3.718a1,1,0,1,0-1,1.732Zm-4.438-.253a1,1,0,0,0,1-1.732Zm-2.439-3.718a1,1,0,0,0-1,1.733Zm-4.439-.252a1,1,0,1,0,1-1.733Zm-2.438-3.718a1,1,0,1,0-1,1.732Zm-4.44-.253a1,1,0,1,0,1-1.733Zm-2.438-3.717a1,1,0,0,0-1,1.732Zm-4.439-.254a1,1,0,0,0,1-1.732Zm-2.438-3.717a1,1,0,0,0-1,1.732Zm-4.439-.253a1,1,0,0,0,1-1.732ZM704.98,268.7a1,1,0,0,0-1,1.732Zm-4.438-.253a1,1,0,1,0,1-1.732Zm-2.439-3.717a1,1,0,1,0-1,1.732Zm-4.438-.253a1,1,0,0,0,1-1.733Zm-2.439-3.718a1,1,0,1,0-1,1.732Zm-4.439-.253a1,1,0,1,0,1-1.732Zm-2.438-3.718a1,1,0,0,0-1,1.733Zm-4.439-.253a1,1,0,1,0,1-1.732ZM796.1,321.306l-1.719-.993-1,1.732,1.719.993Zm-5.158-2.978-3.438-1.986-1,1.733,3.438,1.985Zm-6.877-3.971-3.439-1.986-1,1.733,3.439,1.985Zm-6.877-3.97-3.439-1.986-1,1.732,3.439,1.986Zm-6.877-3.971-3.439-1.985-1,1.732,3.439,1.985Zm-6.878-3.971L760,300.46l-1,1.732,3.438,1.985Zm-6.877-3.97-3.438-1.986-1,1.733,3.438,1.985Zm-6.877-3.971-3.439-1.985-1,1.732,3.439,1.985Zm-6.877-3.971-3.439-1.985-1,1.732,3.439,1.986Zm-6.877-3.97-3.439-1.986-1,1.733,3.439,1.985Zm-6.878-3.971-3.438-1.985-1,1.732,3.438,1.986Zm-6.878-3.971-3.438-1.984-1,1.732,3.438,1.985Zm-6.877-3.97-3.438-1.985-1,1.732,3.438,1.985Zm-6.877-3.97L704.98,268.7l-1,1.732,3.439,1.986Zm-6.877-3.971-3.439-1.985-1,1.732,3.439,1.985Zm-6.877-3.971-3.439-1.985-1,1.732,3.439,1.986Zm-6.878-3.97-3.438-1.986-1,1.733,3.438,1.985ZM680.91,254.8l-1.719-.992-1,1.732,1.719.992Z"
                transform="translate(508 135)"
                fill="#c2c2c2"
              />
            </g>
          </svg>
          <div className="icon-abs-mid-left w-[64px] h-[64px] translate-x-[-50%] translate-y-[-50%]">
            <Image
              src={tokenList.tokens[1].logoURI}
              alt="token"
              height={64}
              width={64}
            />
          </div>
          <div className="icon-abs-right w-[64px] h-[64px] translate-x-[50%] translate-y-[-50%]">
            <Image
              src={tokenList.tokens[2].logoURI}
              alt="token"
              height={64}
              width={64}
            />
          </div>
          <div className="icon-abs-bottom-right w-[64px] h-[64px] translate-x-[50%] translate-y-[50%]">
            <Image
              src={tokenList.tokens[3].logoURI}
              alt="token"
              height={64}
              width={64}
            />
          </div>
        </div>
        <InfoBanner>
          <span className="text-left font-semibold text-sm">
            For each ASTR you will get 1 ve-ASTR and 1 stk-ASTR.
          </span>
          <span className="block text-sm font-light">
            Read more about ve-ASTR and str-ASTR on the{' '}
            <span className="link">
              <Link href="wiki">Wiki</Link>
            </span>
          </span>
        </InfoBanner>
        <TokenInput
          amount={splitAmount}
          handleAmountChange={setSplitAmount}
          token={tokenList.tokens[1]}
        />
        <div className="flex justify-center border-0 my-4">
          <ArrowsDown />
        </div>
        <TokenInput amount={splitAmount} token={tokenList.tokens[2]} />
        <TokenInput amount={splitAmount} token={tokenList.tokens[3]} />
        <div className="mt-8">
          <LoadingButton
            text="SPLIT"
            loading={splitLoading}
            onClick={() => onSplitTokens()}
          />
        </div>
      </CardContainer>

      <CardContainer
        title="Merge"
        subtitle="Merge your stk-ASTR and ve-ASTR into ASTR"
      >
        <div className="text-primary relative m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="330.274"
            height="363"
            viewBox="0 0 330.274 363"
          >
            <g transform="translate(-1081.624 -583.475)">
              <path
                d="M628.124,575.2a54.5,54.5,0,1,1-54.5,54.5,54.5,54.5,0,0,1,54.5-54.5"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M687.874,524.475h46a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-46a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(508 135)"
                fill="#c2c2c2"
              />
              <path
                d="M692.824,541.575h2.416v-7.264l3.12,4.736h.064l3.152-4.784v7.312h2.448v-11.2h-2.656l-2.944,4.736-2.944-4.736h-2.656Zm13.7,0h2.464v-11.2h-2.464Zm4.963,0h2.432v-7.12l5.424,7.12h2.1v-11.2H719.01v6.9l-5.248-6.9H711.49Zm14.949,0H728.9v-8.928h3.408v-2.272h-9.28v2.272h3.408Z"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M741.648,651.2h46a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-46a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(508 135)"
                fill="#c2c2c2"
              />
              <path
                d="M746.6,668.3h2.416v-7.264l3.12,4.736h.064l3.152-4.784V668.3H757.8V657.1h-2.656l-2.944,4.736-2.944-4.736H746.6Zm13.7,0h2.464V657.1H760.3Zm4.963,0H767.7v-7.12l5.424,7.12h2.1V657.1h-2.432V664l-5.248-6.9h-2.272Zm14.949,0h2.464v-8.928h3.408V657.1H776.8v2.272h3.408Z"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                className="fill-current"
                d="M739.148,585.2h51a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-51a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(508 135)"
              />
              <path
                d="M742.52,602.2h5.328c2.528,0,4.192-1.024,4.192-3.072V599.1a2.737,2.737,0,0,0-2.1-2.752,2.6,2.6,0,0,0,1.472-2.416V593.9a2.569,2.569,0,0,0-.768-1.9A4.044,4.044,0,0,0,747.72,591h-5.2Zm6.448-7.856c0,.832-.688,1.184-1.776,1.184H744.92V593.16h2.432c1.04,0,1.616.416,1.616,1.152Zm.624,4.448v.032c0,.832-.656,1.216-1.744,1.216H744.92v-2.464h2.848c1.264,0,1.824.464,1.824,1.216m8.847,3.584c3.008,0,4.912-1.664,4.912-5.056V591h-2.464v6.416c0,1.776-.912,2.688-2.416,2.688s-2.416-.944-2.416-2.768V591h-2.464v6.4c0,3.3,1.84,4.976,4.848,4.976m7.122-.176h2.464v-3.584h1.936l2.4,3.584h2.88l-2.736-4a3.478,3.478,0,0,0,2.4-3.472V594.7a3.516,3.516,0,0,0-.96-2.56A4.463,4.463,0,0,0,770.681,591h-5.12Zm2.464-5.76v-3.216h2.448c1.2,0,1.936.544,1.936,1.6v.032c0,.944-.688,1.584-1.888,1.584Zm8.8,5.76h2.432v-7.12l5.424,7.12h2.1V591h-2.432v6.9l-5.248-6.9h-2.272Z"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                className="fill-current"
                d="M685.374,712.475h51a4,4,0,0,1,4,4v15a4,4,0,0,1-4,4h-51a4,4,0,0,1-4-4v-15a4,4,0,0,1,4-4"
                transform="translate(508 135)"
              />
              <path
                d="M688.746,729.475h5.328c2.528,0,4.192-1.024,4.192-3.072v-.032a2.737,2.737,0,0,0-2.1-2.752,2.605,2.605,0,0,0,1.472-2.416v-.032a2.569,2.569,0,0,0-.768-1.9,4.044,4.044,0,0,0-2.928-.992h-5.2Zm6.448-7.856c0,.832-.688,1.184-1.776,1.184h-2.272v-2.368h2.432c1.04,0,1.616.416,1.616,1.152Zm.624,4.448v.032c0,.832-.656,1.216-1.744,1.216h-2.928v-2.464h2.848c1.264,0,1.824.464,1.824,1.216m8.847,3.584c3.008,0,4.912-1.664,4.912-5.056v-6.32h-2.464v6.416c0,1.776-.912,2.688-2.416,2.688s-2.416-.944-2.416-2.768v-6.336h-2.464v6.4c0,3.3,1.84,4.976,4.848,4.976m7.122-.176h2.464v-3.584h1.936l2.4,3.584h2.88l-2.736-4a3.478,3.478,0,0,0,2.4-3.472v-.032a3.516,3.516,0,0,0-.96-2.56,4.463,4.463,0,0,0-3.264-1.136h-5.12Zm2.464-5.76V720.5H716.7c1.2,0,1.936.544,1.936,1.6v.032c0,.944-.688,1.584-1.888,1.584Zm8.8,5.76h2.432v-7.12l5.424,7.12H733v-11.2h-2.432v6.9l-5.248-6.9h-2.272Z"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M847.4,448.475a54.5,54.5,0,1,1-54.5,54.5,54.5,54.5,0,0,1,54.5-54.5"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M849.4,702.475a54.5,54.5,0,1,1-54.5,54.5,54.5,54.5,0,0,1,54.5-54.5"
                transform="translate(508 135)"
                fill="#FFF8F1"
              />
              <path
                d="M799.863,722.744a1,1,0,0,0,.707-1.224l-2.329-8.694a1,1,0,0,0-1.932.518l2.071,7.728-7.728,2.07a1,1,0,1,0,.518,1.932Zm-1.478-2.824a1,1,0,1,0-1,1.732Zm-4.439-.253a1,1,0,0,0,1-1.733Zm-2.438-3.718a1,1,0,0,0-1,1.733Zm-4.439-.253a1,1,0,1,0,1-1.732Zm-2.439-3.718a1,1,0,0,0-1,1.733Zm-4.438-.252a1,1,0,0,0,1-1.733Zm-2.439-3.718a1,1,0,0,0-1,1.732Zm-4.438-.253a1,1,0,1,0,1-1.732Zm-2.439-3.718a1,1,0,0,0-1,1.733Zm-4.439-.253a1,1,0,0,0,1-1.732ZM764,700.067a1,1,0,1,0-1,1.732Zm-4.439-.253a1,1,0,0,0,1-1.733Zm-2.438-3.718a1,1,0,0,0-1,1.733Zm-4.439-.253a1,1,0,1,0,1-1.732Zm-2.439-3.718a1,1,0,0,0-1,1.733Zm-4.438-.252a1,1,0,0,0,1-1.733Zm-2.439-3.718a1,1,0,1,0-1,1.732Zm-4.438-.253a1,1,0,0,0,1-1.732Zm-2.439-3.718a1,1,0,0,0-1,1.733Zm-4.439-.252a1,1,0,1,0,1-1.733Zm-2.438-3.718a1,1,0,1,0-1,1.732Zm-4.44-.253a1,1,0,1,0,1-1.732Zm-2.438-3.717a1,1,0,0,0-1,1.732Zm-4.439-.254a1,1,0,0,0,1-1.732Zm-2.438-3.717a1,1,0,0,0-1,1.732Zm-4.439-.253a1,1,0,0,0,1-1.733ZM708.98,668.3a1,1,0,0,0-1,1.732Zm-4.438-.253a1,1,0,1,0,1-1.732Zm-2.439-3.718a1,1,0,0,0-1,1.733Zm-4.438-.252a1,1,0,0,0,1-1.733Zm-2.439-3.718a1,1,0,1,0-1,1.732Zm-4.439-.253a1,1,0,0,0,1-1.733Zm-2.438-3.718a1,1,0,0,0-1,1.733Zm-4.439-.253a1,1,0,1,0,1-1.732ZM800.1,720.912l-1.719-.992-1,1.732,1.719.993Zm-5.158-2.978-3.438-1.985-1,1.733,3.438,1.985Zm-6.877-3.97-3.439-1.986-1,1.733,3.439,1.985Zm-6.877-3.971-3.439-1.985-1,1.732,3.439,1.986Zm-6.877-3.97-3.439-1.986-1,1.733,3.439,1.985Zm-6.878-3.971L764,700.067l-1,1.732,3.438,1.985Zm-6.877-3.971-3.438-1.985-1,1.733,3.438,1.985Zm-6.877-3.97-3.439-1.986-1,1.733,3.439,1.985Zm-6.877-3.971-3.439-1.985-1,1.732,3.439,1.986Zm-6.877-3.97-3.439-1.986-1,1.733,3.439,1.985Zm-6.878-3.971-3.438-1.985-1,1.732,3.438,1.986Zm-6.878-3.97-3.438-1.985-1,1.732,3.438,1.985Zm-6.877-3.971-3.438-1.985-1,1.732,3.438,1.985Zm-6.877-3.971L708.98,668.3l-1,1.732,3.439,1.986Zm-6.877-3.97-3.439-1.986-1,1.733,3.439,1.985Zm-6.877-3.971-3.439-1.985-1,1.732,3.439,1.986Zm-6.878-3.971-3.438-1.985-1,1.733,3.438,1.985Zm-6.877-3.97-1.719-.993-1,1.733,1.719.992Z"
                transform="translate(508 135)"
                fill="#c2c2c2"
              />
              <path
                className="fill-current"
                d="M676.433,663.705a1,1,0,0,0-.707,1.225l2.329,8.693a1,1,0,0,0,1.932-.517l-2.071-7.728,7.728-2.07a1,1,0,1,0-.518-1.932ZM794.1,731.3,677.192,663.8l-1,1.732,116.913,67.5Z"
                transform="translate(508 135)"
              />
              <path
                d="M794.54,527.537a1,1,0,0,0-.707-1.224l-8.693-2.33a1,1,0,1,0-.518,1.932l7.728,2.071-2.071,7.727a1,1,0,0,0,1.932.518Zm-3.185-.132a1,1,0,0,0,1,1.732Zm-2.439,3.718a1,1,0,0,0-1-1.732Zm-4.438.252a1,1,0,0,0,1,1.733Zm-2.439,3.718a1,1,0,1,0-1-1.732Zm-4.439.253a1,1,0,0,0,1,1.733Zm-2.438,3.718a1,1,0,0,0-1-1.733Zm-4.439.253a1,1,0,1,0,1,1.732Zm-2.438,3.717a1,1,0,1,0-1-1.732Zm-4.439.254a1,1,0,1,0,1,1.732Zm-2.439,3.717a1,1,0,1,0-1-1.732Zm-4.438.253a1,1,0,0,0,1,1.732Zm-2.439,3.718a1,1,0,0,0-1-1.732Zm-4.438.252a1,1,0,0,0,1,1.733Zm-2.439,3.718a1,1,0,0,0-1-1.732Zm-4.439.253a1,1,0,0,0,1,1.733Zm-2.438,3.718a1,1,0,0,0-1-1.733Zm-4.439.253a1,1,0,0,0,1,1.732Zm-2.438,3.717a1,1,0,1,0-1-1.732Zm-4.439.253a1,1,0,0,0,1,1.733Zm-2.439,3.718a1,1,0,1,0-1-1.733Zm-4.439.253a1,1,0,0,0,1,1.732Zm-2.439,3.718a1,1,0,1,0-1-1.733Zm-4.438.252a1,1,0,0,0,1,1.733Zm-2.439,3.718a1,1,0,1,0-1-1.732Zm-4.438.253a1,1,0,1,0,1,1.732Zm-2.439,3.718a1,1,0,0,0-1-1.733Zm-4.439.253a1,1,0,1,0,1,1.732Zm-2.438,3.717a1,1,0,0,0-1-1.732Zm-4.439.254a1,1,0,1,0,1,1.732Zm-2.438,3.717a1,1,0,0,0-1-1.732Zm-4.439.253a1,1,0,0,0,1,1.732Zm-2.439,3.718a1,1,0,0,0-1-1.733Zm-4.438.252a1,1,0,0,0,1,1.733Zm-2.439,3.718a1,1,0,0,0-1-1.732Zm114.194-68.239-1.719.992,1,1.732,1.719-.992Zm-5.158,2.978-3.438,1.984,1,1.733,3.438-1.985Zm-6.877,3.97-3.439,1.985,1,1.733,3.439-1.986Zm-6.877,3.97-3.439,1.986,1,1.732,3.439-1.985Zm-6.877,3.971-3.439,1.986,1,1.732,3.439-1.986Zm-6.878,3.971-3.438,1.985,1,1.732,3.438-1.985Zm-6.877,3.971-3.438,1.984,1,1.733,3.438-1.985Zm-6.877,3.97-3.439,1.985,1,1.733,3.439-1.986Zm-6.877,3.97-3.439,1.986,1,1.732,3.439-1.985Zm-6.877,3.971-3.439,1.985,1,1.733,3.439-1.986Zm-6.878,3.97-3.439,1.986,1,1.732,3.439-1.985Zm-6.878,3.971-3.438,1.985,1,1.733,3.438-1.985Zm-6.877,3.971-3.438,1.985,1,1.732,3.438-1.985Zm-6.877,3.97-3.439,1.986,1,1.732,3.439-1.985Zm-6.877,3.971-3.439,1.986,1,1.732,3.439-1.986Zm-6.877,3.971-3.439,1.985,1,1.732,3.439-1.985Zm-6.878,3.97-3.438,1.985,1,1.733,3.438-1.985Zm-6.877,3.971-1.719.992,1,1.733,1.719-.993Z"
                transform="translate(508 135)"
                fill="#c2c2c2"
              />
              <path
                className="fill-current"
                d="M681.7,604.912a1,1,0,0,0,.707,1.225l8.693,2.329a1,1,0,1,0,.518-1.931l-7.728-2.071,2.071-7.727a1,1,0,1,0-1.932-.518ZM799.075,536.8,682.162,604.3l1,1.732,116.913-67.5Z"
                transform="translate(508 135)"
              />
            </g>
          </svg>

          <div className="icon-abs-mid-left w-[64px] h-[64px] translate-x-[-50%] translate-y-[-50%]">
            <Image
              src={tokenList.tokens[1].logoURI}
              alt="token"
              height={64}
              width={64}
            />
          </div>
          <div className="icon-abs-right w-[64px] h-[64px] translate-x-[50%] translate-y-[-50%]">
            <Image
              src={tokenList.tokens[2].logoURI}
              alt="token"
              height={64}
              width={64}
            />
          </div>
          <div className="icon-abs-bottom-right w-[64px] h-[64px] translate-x-[50%] translate-y-[50%]">
            <Image
              src={tokenList.tokens[3].logoURI}
              alt="token"
              height={64}
              width={64}
            />
          </div>
        </div>
        <InfoBanner>
          <span className="text-left font-semibold text-sm">
            For each ASTR you will get 1 ve-ASTR and 1 stk-ASTR.
          </span>
          <span className="block text-sm font-light">
            Read more about ve-ASTR and str-ASTR on the{' '}
            <span className="link">
              <Link href="wiki">Wiki</Link>
            </span>
          </span>
        </InfoBanner>
        <TokenInput
          amount={mergeAmount}
          handleAmountChange={setMergeAmount}
          token={tokenList.tokens[2]}
        />
        <TokenInput
          amount={mergeAmount}
          handleAmountChange={setMergeAmount}
          token={tokenList.tokens[3]}
        />
        <div className="flex justify-center border-0 my-4">
          <ArrowsDown />
        </div>
        <TokenInput amount={mergeAmount} token={tokenList.tokens[1]} />
        <div className="mt-8">
          <LoadingButton
            text="SPLIT"
            loading={mergeLoading}
            onClick={() => onMergeTokens()}
          />
        </div>
      </CardContainer>
    </div>
  )
}

Split.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout padding={0}>
      <NavTab page="trade" />
      {page}
    </Layout>
  )
}

export default Split
