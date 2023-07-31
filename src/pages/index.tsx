import React  from "react";
import AccountDetailsHeader from "@/components/AccountDetailsHeader/AccountDetailsHeader.component";
import TransactionTable from "@/components/TransactionTable/TransactionTable.component";
import {getAccountData} from "@/pages/api/accounts";
import {formatAndGetBalance} from "@/utils/TransactionHelpers/TransactionHelpers";
import LoadingPageComponent from "@/components/LoadingPageComponent";
import {formatCurrency} from "@/utils/StringFormatter/StringFormatter";

// eslint-disable-next-line react/prop-types
export default function Home({customerTransactions, availableBalance,accountHolderNames, currencyCode, accountNumber, bankCode }:any) {
    if (customerTransactions === null) {
        return (<LoadingPageComponent/>)
    }

    return (
        <main className={"p-0 md:p-16"} >
            <div className={"mx-1"}>
                <AccountDetailsHeader
                    accountHolderNames={accountHolderNames}
                    availableBalance={availableBalance}
                    currencyCode={currencyCode}
                    accountNumber={accountNumber}
                    bankCode={bankCode}
                />
                <TransactionTable  customerTransactions={customerTransactions} />
            </div>
        </main>
  )
}

export async function getStaticProps() {
    const fetchedData = await getAccountData()

    const {accounts} = fetchedData
    const {balances, transactions} = accounts[0]
    const {accountHolderNames, identifiers, currencyCode} = accounts[0]
    const {accountNumber, bankCode} = identifiers

    let availableBalance = balances.available.amount

    if(balances.available.creditDebitIndicator === "Credit") {
        availableBalance = availableBalance * -1
    }
    const customerBalance = formatCurrency(currencyCode,availableBalance)

    const customerTransactions = formatAndGetBalance(transactions, currencyCode, availableBalance)

    return {
        props: {
            customerTransactions,
            availableBalance: customerBalance,
            accountHolderNames,
            currencyCode,
            accountNumber,
            bankCode
        },
    };
}
