import {describe, it, expect} from "@jest/globals";
import {formatAndGetBalance} from "@/utils/TransactionHelpers/TransactionHelpers";
import {TransactionData} from "@/pages/api/provider.type";
import {CustomerTransactionData} from "@/types/Transaction";


describe('Transaction Helper', () => {
    it('should display the right data and balance', () => {
        const rawData: Array<TransactionData> = [
            {
                "transactionId": "2023670980",
                "description": "Online Payment xxxxxx To  HOME MORTGAGE",
                "amount": 800.00,
                "creditDebitIndicator": "Debit",
                "status": "Booked",
                "transactionCode": {
                    "code": "PAYMENT",
                    "subCode": "HOME_LOAN_MORTGAGE"
                },
                "proprietaryTransactionCode": null,
                "bookingDate": "2023-01-05T00:00:00Z",
                "merchantDetails": {
                    "merchantName": null,
                    "merchantCategoryCode": null
                },
                "enrichedData": {
                    "category": {
                        "id": 30016,
                        "name": "Mortgage payment",
                        "confidence": 0.948304533958435
                    },
                    "class": {
                        "id": 11,
                        "name": "Payment Transfer",
                        "confidence": 0.986605584621429
                    },
                    "predictedMerchantName": null
                }
            },
            {
                "transactionId": "2023671000",
                "description": "SAINSBURYS LOC xxxx    LONDON     US",
                "amount": 0.60,
                "creditDebitIndicator": "Debit",
                "status": "Booked",
                "transactionCode": {
                    "code": "PURCHASE",
                    "subCode": "PURCHASE"
                },
                "proprietaryTransactionCode": null,
                "bookingDate": "2023-01-04T00:00:00Z",
                "merchantDetails": {
                    "merchantName": "Sainsbury Market",
                    "merchantCategoryCode": null
                },
                "enrichedData": {
                    "category": {
                        "id": 0,
                        "name": "Uncategorised",
                        "confidence": 0.205533519387245
                    },
                    "class": {
                        "id": 5,
                        "name": "Point-of-Sale Transaction",
                        "confidence": 0.816252112388611
                    },
                    "predictedMerchantName": "Sainsbury's"
                }
            },
            {
                "transactionId": "2023670996",
                "description": "SAINSBURYS SACAT xxxx  MEADOWBANK    US",
                "amount": 19.10,
                "creditDebitIndicator": "Debit",
                "status": "Booked",
                "transactionCode": {
                    "code": "PURCHASE",
                    "subCode": "PURCHASE"
                },
                "proprietaryTransactionCode": null,
                "bookingDate": "2023-01-04T00:00:00Z",
                "merchantDetails": {
                    "merchantName": "Sainsbury Market",
                    "merchantCategoryCode": null
                },
                "enrichedData": {
                    "category": {
                        "id": 0,
                        "name": "Uncategorised",
                        "confidence": 0.205560564994812
                    },
                    "class": {
                        "id": 5,
                        "name": "Point-of-Sale Transaction",
                        "confidence": 0.816006541252136
                    },
                    "predictedMerchantName": "Sainsbury's"
                }
            },
            {
                "transactionId": "2023670992",
                "description": "FUNKYPIGEON.COM        SWINDON       US",
                "amount": 3.10,
                "creditDebitIndicator": "Debit",
                "status": "Booked",
                "transactionCode": {
                    "code": "PURCHASE",
                    "subCode": "PURCHASE"
                },
                "proprietaryTransactionCode": null,
                "bookingDate": "2023-01-04T00:00:00Z",
                "merchantDetails": {
                    "merchantName": "Funky Pigeon",
                    "merchantCategoryCode": null
                },
                "enrichedData": {
                    "category": {
                        "id": 30036,
                        "name": "Online retail",
                        "confidence": 0.607102990150452
                    },
                    "class": {
                        "id": 5,
                        "name": "Point-of-Sale Transaction",
                        "confidence": 0.92792946100235
                    },
                    "predictedMerchantName": null
                }
            },
            {
                "transactionId": "2023670988",
                "description": "pot_0000xxxxxxxxxxxxxxxxxxxxxx",
                "amount": 2.65,
                "creditDebitIndicator": "Debit",
                "status": "Booked",
                "transactionCode": {
                    "code": "PURCHASE",
                    "subCode": "PURCHASE"
                },
                "proprietaryTransactionCode": null,
                "bookingDate": "2023-01-04T00:00:00Z",
                "merchantDetails": {
                    "merchantName": null,
                    "merchantCategoryCode": null
                },
                "enrichedData": {
                    "category": {
                        "id": 0,
                        "name": "Uncategorised",
                        "confidence": 0.257079750299454
                    },
                    "class": {
                        "id": 5,
                        "name": "Point-of-Sale Transaction",
                        "confidence": 0.73047536611557
                    },
                    "predictedMerchantName": null
                }
            },
        ];
        const expected: Array<CustomerTransactionData> =
            [
                {
                    balance: '$1,000.25',
                    category: 'Mortgage payment',
                    credit: '-',
                    date: '2023-01-05T00:00:00Z',
                    debit: '$800.00',
                    description: 'Online Payment Xxxxxx To Home Mortgage',
                    transactionId: '2023670980'
                },
                {
                    balance: '$1,000.85',
                    category: 'Uncategorised',
                    credit: '-',
                    date: '2023-01-04T00:00:00Z',
                    debit: '$0.60',
                    description: 'Sainsburys Loc Xxxx London Us',
                    transactionId: '2023671000'
                },
                {
                    balance: '$1,019.95',
                    category: 'Uncategorised',
                    credit: '-',
                    date: '2023-01-04T00:00:00Z',
                    debit: '$19.10',
                    description: 'Sainsburys Sacat Xxxx Meadowbank Us',
                    transactionId: '2023670996'
                },
                {
                    balance: '$1,023.05',
                    category: 'Online retail',
                    credit: '-',
                    date: '2023-01-04T00:00:00Z',
                    debit: '$3.10',
                    description: 'Funkypigeon.com Swindon Us',
                    transactionId: '2023670992'
                },
                {
                    balance: '$1,025.70',
                    category: 'Uncategorised',
                    credit: '-',
                    date: '2023-01-04T00:00:00Z',
                    debit: '$2.65',
                    description: 'Pot_0000xxxxxxxxxxxxxxxxxxxxxx',
                    transactionId: '2023670988'
                }
            ];


        const result = formatAndGetBalance(rawData, 'USD', 'US', 1000.25);
        expect(result).toStrictEqual(expected);
    });
});
