import React from 'react'
import copyIcon from '../assets/images/icons/copy.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import numeral from 'numeral'

export const NetworkDetails = ({
  isHome,
  networkData,
  url,
  logo,
  address,
  currency,
  maxCurrentLimit,
  maxPerTx,
  minPerTx,
  tokenAddress,
  totalSupply,
  totalBalance,
  balance,
  displayTokenAddress,
  displayBridgeLimits,
  nativeSupplyTitle,
  tokenName,
  getExplorerAddressUrl
 }) => {
  const networkTitle = isHome ? 'Bridge Home' : 'Bridge Foreign'
  const logoClass = isHome ? 'home-logo' : 'foreign-logo'
  const totalTitle = isHome
    ? nativeSupplyTitle ? `Native Coins Amount` : `Totally minted by the bridge`
    : `${currency} Tokens Amount`
  const totalAmount = isHome ? totalBalance : totalSupply
  const formattedBalance = isNaN(numeral(balance).format('0.00', Math.floor))
    ? numeral(0).format('0,0.00', Math.floor)
    : numeral(balance).format('0,0.000', Math.floor)

  return (
    <div className="network-details">
        <div className="details-logo-container">
          <div className={logoClass}
               style={{color: '#112094', textAlign: 'center', fontWeight: 'bold'}}
          >
            {currency}
          </div>
      </div>
      <div className="details-body">
        <p className="details-data-container">
          <span className="details-label">Network</span>
          <span className="details-description">{url}</span>
        </p>
        <p className="details-data-container">
          <span className="details-label">{networkTitle} Address</span>
            <span className="details-description details-copy">
              <a className="details-description"  href={getExplorerAddressUrl(address)} target="_blank" >
                {address.slice(0,27).concat('...')}
              </a>
              <CopyToClipboard text={address}>
                <img className="info-icon-right" src={copyIcon} alt=""/>
              </CopyToClipboard>
            </span>
        </p>
        {displayBridgeLimits && <p className="details-data-container">
          <span className="details-label">Remaining Daily {currency} Quota</span>
          <span className="details-description-black">{numeral(maxCurrentLimit).format('0,0.0', Math.floor)} {currency}</span>
        </p>}
        {displayBridgeLimits && <p className="details-data-container">
          <span className="details-label">Maximum Amount Per Transaction</span>
          <span className="details-description-black">{numeral(maxPerTx).format('0,0.0', Math.floor)} {currency}</span>
        </p>}
        {displayBridgeLimits && <p className="details-data-container">
          <span className="details-label">Minimum Amount Per Transaction</span>
          <span className="details-description-black">{numeral(minPerTx).format('0,0.000', Math.floor)} {currency}</span>
        </p>}
        {displayTokenAddress && (
          <p className="details-data-container">
            <span className="details-label">Token Address</span>
            <span className="details-description details-copy">
              <a className="details-description" href={getExplorerAddressUrl(tokenAddress)} target="_blank" >
                {tokenAddress.slice(0,27).concat('...')}
              </a>
              <CopyToClipboard text={tokenAddress}>
                <img className="info-icon-right" src={copyIcon} alt=""/>
              </CopyToClipboard>
            </span>
          </p>
        )}
        {displayTokenAddress && (
          <p className="details-data-container">
            <span className="details-label">Token Name</span>
            <span className="details-description-black">{tokenName || 'No token name'}</span>
          </p>
        )}
        <p className="details-data-container">
          <span className="details-label">{totalTitle}</span>
          <span className="details-description-black">{numeral(totalAmount).format('0,0.000', Math.floor)} {currency}</span>
        </p>
        <p className="details-data-container">
          <span className="details-label">Your {currency} Balance</span>
          <span className="details-description-black">
            <strong>{formattedBalance} {currency}</strong>
          </span>
        </p>
      </div>
    </div>
  )
}
