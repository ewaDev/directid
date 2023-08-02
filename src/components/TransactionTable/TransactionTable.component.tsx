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
import TransactionRow from "@/components/TransactionTable/TransactionTableRow.component";
import Button from "@/components/common/Button.component";


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
            <div className={"my-4 overflow-scroll overflow-y-hidden lg:overflow-x-hidden "}>
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
                <div className={'flex justify-center items-center'}>
                    <Button onClick={() => table.setPageIndex(0)} label='First' />
                    <Button onClick={() => () => table.previousPage()} disabled={!table.getCanPreviousPage()} label='Previous' />
                <p>
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount()}
                </p>
                <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} label={'Next'}  />
                <Button onClick={() => table.setPageIndex(table.getPageCount() -1)} label={'Last'} />
            </div>
        </div>
    )
}
