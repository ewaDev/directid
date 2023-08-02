import {createColumnHelper} from "@tanstack/react-table";
import {CustomerTransactionData} from "@/types/Transaction";
import React from "react";

const columnHelper = createColumnHelper<CustomerTransactionData>();
export const TransactionTableColumns = [
    columnHelper.accessor(row => row.description, {
        id: 'Transaction',
        cell: info => <span>{info.getValue()}</span>,
        header: () => <span>Transaction</span>,
        enableSorting: false
    }),
    columnHelper.accessor(row => row.date, {
        id: 'Date',
        cell: info => <span>{new Date( info.getValue()).toLocaleDateString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'})}</span>,
        header: () => <span>Date</span>,
    }),
    columnHelper.accessor(row => row.category, {
        id: 'Category',
        cell: info => <span>{info.getValue()}</span>,
        header: () => <span>Category</span>,
    }),
    columnHelper.accessor(row => row.debit, {
        id: 'Debit',
        cell: info => <span>{info.getValue()}</span>,
        header: () => <span>Debit</span>,
        enableSorting: false
    }),
    columnHelper.accessor(row => row.credit, {
        id: 'Credit',
        cell: info => <span>{info.getValue()}</span>,
        header: () => <span>Credit</span>,
        enableSorting: false
    }),
    columnHelper.accessor(row => row.balance, {
        id: 'Balance',
        cell: info => <span>{info.getValue()}</span>,
        header: () => <span>Balance</span>,
        enableSorting: false
    }),
];
