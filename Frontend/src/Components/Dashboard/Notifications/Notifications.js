import React,{useEffect, useState} from 'react'

const Notifications = () => {
  const [Transactions, setTransactions] = useState([]);
  

  return (
<>
<h3>Notifications</h3>
  <div>
  {/* {Transactions.length === 0 ? (
          <p>No recent transactions</p>
        ) : (
          Transactions.map((tx, index) => (
            <div key={index} style={{ border: "1px solid gray", padding: "10px", margin: "5px" }}>
              <p><strong>Tx Hash:</strong> {tx.txHash}</p>
              <p><strong>Beneficiary:</strong> {tx.beneficiaryAddr}</p>
              <p><strong>Amount:</strong> {tx.amount} USDC</p>
            </div>
          ))
        )} */}
  </div>

</>
  )
}

export default Notifications