import React from "react";
import {flexRender, Row} from "@tanstack/react-table";

type TransactionRowProps = {
    row: Row<any>
};

export const TransactionRow: React.FC<TransactionRowProps> = ({ row }) => {
    return (
        <tr key={row.id} className={`px-4 py-4 overflow-ellipsis text-left table-text`}>
            {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={"px-7 py-2 table-text"} >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
            ))}
        </tr>
    );
};
