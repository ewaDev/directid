'use client'
// import { IconName } from "react-icons/ai";
import React, {useMemo} from "react";
import {
    flexRender,
    getCoreRowModel, getSortedRowModel, SortingState,
    useReactTable,
    getPaginationRowModel
} from '@tanstack/react-table'
import { CustomerTransactionData} from "@/types/Transaction";
import {TransactionTableColumns} from "@/components/TransactionTable/TransactionTableColumns";
import {TransactionRow} from "@/components/TransactionTable/TransactionTableRow.component";

type Props = {
    customerTransactions: Array<CustomerTransactionData>
}
export default function TransactionTable({customerTransactions} : Props) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const tableData = useMemo(() => customerTransactions, [customerTransactions]);

    const table = useReactTable({
        data: tableData,
        columns: TransactionTableColumns,
        state: {
            sorting,
        },
        enableMultiSort: true,
        isMultiSortEvent: () => true,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 15,
            },
        },

    })


    return(
        <div>
        <div className={"my-4 overflow-scroll overflow-y-hidden lg:overflow-x-hidden "} >
        <table className={'w-full'}>
            <thead className={"bg-transparent"} >
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className={"dark-font table-text"}>
                    {headerGroup.headers.map(header => {
                        return (
                            <th key={header.id} className={"px-7 py-4 text-left bg-gray-200"}>
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
            {table.getRowModel().rows.map((row) => (
                <TransactionRow key={row.id} row={row} />
            ))}
            </tbody>
        </table>
        </div>
        <div>
            <button className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5'} onClick={() => table.setPageIndex(0)} > First Page </button>
            <button className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5'} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} > Previous Page </button>
            <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
            </strong>
            <button className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-5'} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} > Next Page </button>
            <button onClick={() => table.setPageIndex(table.getPageCount() -1)} > Last Page </button>
        </div>
        </div>
    )
}
