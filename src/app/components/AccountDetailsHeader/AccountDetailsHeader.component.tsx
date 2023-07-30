import React from "react";
import Image from "next/image";
import {formatBranchCode, formatCurrency} from "@/app/utils/StringFormatter/StringFormatter";

type Props = {
    accountHolderNames: string
    availableBalance: number
    currencyCode:string
    accountNumber:string
    bankCode:string
}
export default function AccountDetailsHeader({accountHolderNames, availableBalance, currencyCode, accountNumber, bankCode}: Props) {
    return (
            <div className={"grid grid-cols-1 md:grid-cols-2"}>
                <div className={"grid grid-cols-1 gap-4 p-4 align-center"}>
                    <Image
                        src="/directid_logo.svg"
                        alt="directid logo"
                        width={180}
                        height={37}
                        // Commenting out `priority` fixes the error:
                        // (0 , _reactdom.preload) is not a function in testing
                        // However, it also disables preloading the image, which is not ideal.
                        // this is a next js issue https://github.com/vercel/next.js/issues/53272
                        // leaving as not real production code
                        priority
                        style={{width: 180, height: 37}}
                    />
                    <h4 className={"dark-font"}> User Transactions ({currencyCode}) </h4>
                </div>

                <div className={"bg-blue-100 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 min-w-screen-md rounded-xl px-4 "}>
                    <div className={""}>
                        <h5 className={"dark-font bg-blue-100"}>{accountHolderNames} </h5>
                        <p>Account number: {accountNumber} </p>
                        <p>Branch Code: {formatBranchCode(bankCode)} </p>
                    </div>
                    <div className={"text-right"}>
                        <p className={"dark-font"}>Balance </p>
                        <h2>{formatCurrency(currencyCode,availableBalance)} </h2>
                    </div>
                </div>
            </div>
    )
}
