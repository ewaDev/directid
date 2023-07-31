import file from "../../public/apollo-carter.json"
import React  from "react";
import AccountDetailsHeader from "@/components/AccountDetailsHeader/AccountDetailsHeader.component";
import TransactionTable, {formatAndGetBalance} from "@/components/TransactionTable/TransactionTable.component";
import {getAccountData} from "@/pages/api/accounts";

export default function Home({customerTransactions}) {
    if (customerTransactions === null) {
        return
    }

    const {accounts} = file
    const {accountHolderNames, identifiers, balances, currencyCode, transactions} = accounts[0]
    const {accountNumber, bankCode} = identifiers
    let availableBalance = balances.available.amount

    if(balances.available.creditDebitIndicator === "Credit") {
        availableBalance = availableBalance * -1
    }

    return (
        <main className={"p-0 md:p-16"} >
            <div className={"mx-1"}>
                <AccountDetailsHeader
                    accountHolderNames={accountHolderNames}
                    availableBalance={availableBalance}
                    currencyCode={currencyCode}
                    accountNumber={accountNumber} bankCode={bankCode}
                />
                {/*@ts-ignore*/}
                <TransactionTable  customerTransactions={customerTransactions} currencyCode={currencyCode} availableBalance={availableBalance} />
            </div>
        </main>
  )
}

export async function getStaticProps() {
    const fetchedData = await getAccountData()

    const {accounts} = fetchedData
    const {accountHolderNames, identifiers, balances, currencyCode, transactions} = accounts[0]
    const {accountNumber, bankCode} = identifiers
    let availableBalance = balances.available.amount

    if(balances.available.creditDebitIndicator === "Credit") {
        availableBalance = availableBalance * -1
    }

    const customerTransactions = formatAndGetBalance(transactions, currencyCode, availableBalance)


    return {
        props: {
            customerTransactions
        },
    };
}
