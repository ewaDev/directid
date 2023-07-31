
export type TransactionData = {
    transactionId: string;
    description: string;
    amount: number;
    creditDebitIndicator: "Credit" | "Debit" | string;
    status: "Booked" | "Pending" | "Cancelled";
    transactionCode: {
        code: string;
        subCode: string;
    };
    proprietaryTransactionCode: null | string;
    bookingDate: string;
    merchantDetails: {
        merchantName: string;
        merchantCategoryCode: string | null;
    };
    enrichedData: {
        category: {
            id: number;
            name: string;
            confidence: number;
        };
        class: {
            id: number;
            name: string;
            confidence: number;
        };
        predictedMerchantName: string;
    };
}

export type CustomerTransactionData = {
    transactionId: string
    description: string
    date: string,
    category: string
    debit: string
    credit: string
    balance: string
}
