import React from 'react'
import numeral from 'numeral'
function Currencyformat({amount}) {
    const formattedAmount = numeral(amount).format('$0,0.00')
    return (
      <span>{formattedAmount}</span>
    )
  }

export default Currencyformat
