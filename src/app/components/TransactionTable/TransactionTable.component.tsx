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
}

type Props = {
    transactions: Array<TransactionData>
    currencyCode: string
}

export default function TransactionTable({transactions, currencyCode} : Props) {
    const [sorting, setSorting] = React.useState<SortingState>([])

    const mapData: Array<TransactionRow> = transactions.map(item => {
        return {
            transactionId: item.transactionId,
            description: item.description,
            date: item.bookingDate,
            category: item.enrichedData?.category.name,
            debit: item.creditDebitIndicator === 'Debit' ? formatCurrency(currencyCode, item.amount) : '-',
            credit: item.creditDebitIndicator === 'Credit' ? formatCurrency(currencyCode, item.amount) : '-'
        }
    }).sort((a:TransactionRow, b:TransactionRow) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const [tableData] = useState(mapData.slice(0,10))
    const columnHelper = createColumnHelper<TransactionRow>()

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
        <div className={"my-4 overflow-scroll"}>
        <table className={'w-full'}>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                        return (
                            <th key={header.id} className={"px-7 py-2"}>
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
            {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={"px-7 py-2 overflow-ellipsis "}>
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
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
