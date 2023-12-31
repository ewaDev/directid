import {capitaliseWordsInSentence, formatCurrency} from "@/utils/StringFormatter/StringFormatter";
import {CustomerTransactionData} from "@/types/Transaction";

export function formatAndGetBalance(transactions:Array<any>, currencyCode:string, countryCode:string, startingBalance: number): Array<CustomerTransactionData> {
    let currentBalance = startingBalance;

    return transactions.map((item, index) => {
        let transactionItem : CustomerTransactionData = {
            balance: "",
            category: "",
            credit: "",
            date: "",
            debit: "",
            description: "",
            transactionId: ""
        };

        if(item.creditDebitIndicator === 'Debit'){
            currentBalance = index === 0 ? currentBalance : currentBalance + item.amount;
            transactionItem.balance = formatCurrency(countryCode, currencyCode,currentBalance);
            transactionItem.debit = formatCurrency(countryCode, currencyCode, item.amount);
            transactionItem.credit = '-';
        } else {
            currentBalance = index === 0 ? currentBalance : currentBalance - item.amount;
            transactionItem.balance = formatCurrency(countryCode, currencyCode, currentBalance);
            transactionItem.credit = formatCurrency(countryCode, currencyCode, item.amount);
            transactionItem.debit = '-';
        }

        transactionItem.transactionId = item.transactionId;
        transactionItem.description = capitaliseWordsInSentence(item.description).replace(/\s+/g, ' ');
        transactionItem.date = item.bookingDate;
        transactionItem.category= item.enrichedData?.category.name;

        return transactionItem;
    });
}
