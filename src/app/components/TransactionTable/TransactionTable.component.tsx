'use client'

import {formatCurrency} from "@/app/utils/StringFormatter/StringFormatter";
import React, {useMemo, useState} from "react";
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel, getSortedRowModel, SortingState,
    useReactTable,
} from '@tanstack/react-table'
import {TransactionData} from "@/app/types/Transaction";


type TransactionRow = {
    transactionId: string
    description: string
    date: string,
    category: string
    debit: string
    credit: string
    balance: string
}

type Props = {
    transactions: Array<TransactionData>
    currencyCode: string
    availableBalance: number
}

function formatAndGetBalance(transactions:Array<any>, currencyCode:string, startingBalance: number): Array<TransactionRow> {
    let currentBalance = startingBalance;

    const mapData: Array<TransactionRow> = transactions.map((item, index) => {
        let transactionItem : TransactionRow = {
            balance: "",
            category: "",
            credit: "",
            date: "",
            debit: "",
            description: "",
            transactionId: ""
        };


        if(item.creditDebitIndicator === 'Debit'){
            currentBalance = index === 0 ? currentBalance : currentBalance + item.amount
            transactionItem.balance = formatCurrency(currencyCode,currentBalance)
            transactionItem.debit = formatCurrency(currencyCode, item.amount)
            // transactionItem.balance = currentBalance.toString()
            // transactionItem.debit = item.amount

            transactionItem.credit = '-'
        } else {
            currentBalance = index === 0 ? currentBalance : currentBalance - item.amount
            transactionItem.balance = formatCurrency(currencyCode, currentBalance)
            transactionItem.credit = formatCurrency(currencyCode, item.amount)

            // transactionItem.balance = currentBalance.toString()
            // transactionItem.credit = item.amount.toString()
            transactionItem.debit = '-'
        }

        transactionItem.transactionId = item.transactionId;
        transactionItem.description = item.description;
        transactionItem.date = item.bookingDate
        transactionItem.category= item.enrichedData?.category.name;

        return transactionItem
    })

    return mapData
}

export default function TransactionTable({transactions, currencyCode, availableBalance} : Props) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [tableData] = useState(formatAndGetBalance(transactions, currencyCode, availableBalance).slice(0,10))

    const columnHelper = createColumnHelper<TransactionRow>()


    // useEffect(() => {
    //
    // }, )

    const columns = useMemo<ColumnDef<any, any>[]>(() => [
        columnHelper.accessor(row => row.description, {
            id: 'Transaction',
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Transaction</span>,

            enableSorting: false
        }),
        columnHelper.accessor(row => row.date, {
            id: 'Date',
            cell: info => <i>{new Date( info.getValue()).toLocaleDateString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'})}</i>,
            header: () => <span>Date</span>,
        }),
        columnHelper.accessor(row => row.category, {
            id: 'Category',
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Category</span>,
            }),
        columnHelper.accessor(row => row.debit, {
            id: 'Debit',
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Debit</span>,
            enableSorting: false
        }),
        columnHelper.accessor(row => row.credit, {
            id: 'Credit',
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Credit</span>,
            enableSorting: false
        }),
        columnHelper.accessor(row => row.balance, {
            id: 'Balance',
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Balance</span>,
            enableSorting: false
        }),
    ], [])

    const table = useReactTable({
        data: tableData,
        columns: columns,
        state: {
            sorting,
        },
        enableMultiSort: true,
        isMultiSortEvent: () => true,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })


    return(
        <div className={"my-4 overflow-scroll overflow-y-hidden overflow-x "} >
        <table className={'w-full'}>
            <thead className={"bg-gray-200" } >
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className={"dark-font"}>
                    {headerGroup.headers.map(header => {
                        return (
                            <th key={header.id} className={"px-7 py-4 text-left"}>
                                {header.isPlaceholder ? null : (
                                    <div
                                        {...{
                                            className: header.column.getCanSort()
                                                ? 'cursor-pointer select-none'
                                                : '',
                                            onClick: header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                )}
                            </th>
                        )
                    })}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row, index) => (
                <tr key={row.id} className={`px-4 py-4 overflow-ellipsis text-left table-text ${ index % 2 === 0 ?  '' : 'bg-gray-100'}`}   >
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className={"px-7 py-2 table-text"} >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}
