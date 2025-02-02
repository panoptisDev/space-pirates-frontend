export type Addresses = {
  tokensContract: string
  stakingContract: string
  splitContract: string
  faucetContract: string
  wrapperContract: string
  factoryContract: string
  routerContract: string
  masterChefContract: string
  questRedeemContract: string
  battleFieldMintContract: string
  marketPlaceContract: string
  nftContract: string
  nftCollectionContract: string
  nftStarterContract: string
  chainId: string
  USDT: string
  USDD: string
}

export type AddressesList =
  | 'tokensContract'
  | 'stakingContract'
  | 'splitContract'
  | 'faucetContract'
  | 'wrapperContract'
  | 'factoryContract'
  | 'routerContract'
  | 'masterChefContract'
  | 'questRedeemContract'
  | 'battleFieldMintContract'
  | 'marketPlaceContract'
  | 'nftContract'
  | 'nftCollectionContract'
  | 'nftStarterContract'
  | 'chainId'
  | 'USDT'
  | 'USDD'

export type ABIsList = AddressesList | 'staticRouterContract'

export type AddressesConfig = {
  shasta: Addresses
  mainnet: Addresses
}

export type SupportedChains = 'mainnet' | 'shasta'
