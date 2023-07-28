import file from "./data/apollo-carter.json"
import React from "react";

export default function Home() {
    const {accounts} = file

    const {accountHolderNames, transactions, identifiers, balances, currencyCode} = accounts[0]
    const {accountNumber, bankCode} = identifiers
    const moneySign = currencyCode === 'USD' ? '$': '£'
    const availableBalance = moneySign + balances.available.amount


  return (
    <main className="flex">
        <div className={"flex flex-row"}>
             <div className={"flex"}>
            DIRECT ID LOGO GOES HERE
          USER TRANSACTIONS ({currencyCode})
             </div>

      <div>
          {accountHolderNames}
          Account number {accountNumber}
          Bank Code {bankCode}
          Balance is {availableBalance}

      </div>

        </div>
    </main>
  )
}
