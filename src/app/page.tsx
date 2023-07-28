import file from "./data/apollo-carter.json"
import React from "react";
import AccountDetailsHeader from "@/app/components/AccountDetailsHeader/AccountDetailsHeader.component";

export default function Home() {
    const {accounts} = file
    const {accountHolderNames, transactions, identifiers, balances, currencyCode} = accounts[0]
    const {accountNumber, bankCode} = identifiers
    const availableBalance = balances.available.amount

  return (
    <main className={"sm:flex items-center justify-center h-screen min-w-max mx-2"} >
        <AccountDetailsHeader
            accountHolderNames={accountHolderNames}
            availableBalance={availableBalance}
            currencyCode={currencyCode}
            accountNumber={accountNumber} bankCode={bankCode}
        />
    </main>
  )
}
