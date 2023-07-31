'use client'
// import { IconName } from "react-icons/ai";
import React, {useMemo, useState} from "react";
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel, getSortedRowModel, SortingState,
    useReactTable,
} from '@tanstack/react-table'
import {TransactionData, CustomerTransactionData} from "@/types/Transaction";

type Props = {
    customerTransactions: Array<TransactionData>
}

export default function TransactionTable({customerTransactions} : Props) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [tableData] = useState(customerTransactions)

    const columnHelper = createColumnHelper<CustomerTransactionData>()

    const columns = useMemo<ColumnDef<any, any>[]>(() => [
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
                <tr key={headerGroup.id} className={"dark-font table-text"}>
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
