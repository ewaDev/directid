import React from "react";
import Image from "next/image";
import {formatBranchCode} from "@/utils/StringFormatter/StringFormatter";

type Props = {
    accountHolderNames: string
    availableBalance: string
    currencyCode: string
    accountNumber: string
    bankCode: string
}

const IMAGE_WIDTH = 180;
const IMAGE_HEIGHT = 37;
export const AccountDetailsHeader: React.FC<Props> = ({
                                                          accountHolderNames,
                                                          availableBalance,
                                                          currencyCode,
                                                          accountNumber,
                                                          bankCode,
                                                      }) => {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:pr-20"}>
            <div className={"grid grid-cols-1 gap-4 p-4 align-center"}>
                <Image
                    src="/directid_logo.svg"
                    alt="directid logo"
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                    // Commenting out `priority` fixes the error:
                        // (0 , _reactdom.preload) is not a function in testing
                        // However, it also disables preloading the image, which is not ideal.
                        // this is a next js issue https://github.com/vercel/next.js/issues/53272
                        // leaving as not real production code
                        // priority
                        style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
                    />
                    <h4 className={"dark-font bold"}> User Transactions ({currencyCode}) </h4>
                </div>

                <div className={"xl:place-self-end mr-1"}>
                    <div className="flex items-end bg-blue-100 p-6 lg:gap-12 gap-8 rounded-xl max-w-80 justify-between">
                        <div className="flex flex-col items-start">
                            <h5 className="dark-font bg-blue-100 bold">{accountHolderNames}</h5>
                            <p>Account number: {accountNumber}</p>
                            <p>Branch Code: {formatBranchCode(bankCode)}</p>
                        </div>
                        <div className="flex flex-col items-end ">
                            <h4 className="dark-font">Balance</h4>
                            <h1 className={"pt-1"}>{availableBalance}</h1>
                        </div>
                    </div>
                </div>
        </div>
    );
};
