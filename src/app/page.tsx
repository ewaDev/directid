import file from "./data/apollo-carter.json"
import React  from "react";
import AccountDetailsHeader from "@/app/components/AccountDetailsHeader/AccountDetailsHeader.component";
import TransactionTable from "@/app/components/TransactionTable/TransactionTable.component";

export default function Home() {
    const {accounts} = file
    const {accountHolderNames, identifiers, balances, currencyCode, transactions} = accounts[0]
    const {accountNumber, bankCode} = identifiers
    const availableBalance = balances.available.amount


    return (
    <main className={"sm:flex flex-col items-center justify-center h-screen"}  >
        <div className={"mx-1"}>
            <AccountDetailsHeader
                accountHolderNames={accountHolderNames}
                availableBalance={availableBalance}
                currencyCode={currencyCode}
                accountNumber={accountNumber} bankCode={bankCode}
            />
            {/*@ts-ignore*/}
            <TransactionTable  transactions={transactions} currencyCode={currencyCode} />
        </div>

    </main>
  )
}
