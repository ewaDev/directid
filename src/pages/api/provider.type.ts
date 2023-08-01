type Party = {
    partyId: string;
    fullName: string;
    addresses: string[];
    partyType: string | null;
    isIndividual: boolean | null;
    isAuthorizingParty: boolean | null;
    emailAddress: string | null;
    phoneNumbers: string[];
};

type Balance = {
    amount: number;
    creditDebitIndicator: string;
    creditLines: any[];
};

type Identifier = {
    accountNumber: string;
    bankCode: string;
    iban: string | null;
    secondaryIdentification: string | null;
};

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

type Account = {
    accountId: string;
    currencyCode: string;
    displayName: string;
    accountHolderNames: string;
    accountType: string;
    accountSubType: string;
    identifiers: Identifier;
    parties: Party[];
    balances: {
        current: Balance;
        available: Balance;
    };
    transactions: TransactionData[]
};

export type ProviderData = {
    providerName: string;
    countryCode: string;
    accounts: Account[];
};
