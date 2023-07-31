import {describe, it, expect} from "@jest/globals";
import {formatBranchCode, formatCurrency } from './StringFormatter'

describe('StringFormatter', () => {
    const formatBranchCodeTests = [
        {
            input: '112233',
            expected: '11-22-33'
        },
        {
            input: '1122331',
            expected: '11-22-33-1'
        },
        {
            input: '',
            expected: ''
        },
    ]

    formatBranchCodeTests.forEach(test => {
        it(`should format the string ${test.input} into 2 numbers followed by a dash`, () => {
            expect(formatBranchCode(test.input)).toBe(test.expected)
        });
    });

    it('should format the string into 2 numbers followed by a dash', ()=> {
        expect(formatBranchCode('112233')).toBe('11-22-33')
        expect(formatBranchCode('1122331')).toBe('11-22-33-1')
        expect(formatBranchCode('')).toBe('')
    })


    const formatCurrencyTests = [
        {
            input: {currency: 'USD', amount: 2000.00 },
            expected: '$2,000.00'
        },
        {
            input: {currency: 'GBP', amount: 2000 },
            expected: '£2,000.00'
        },
        {
            input: {currency: 'GBP', amount: 2000.45 },
            expected: '£2,000.45'
        },
        {
            input: {currency: 'EUR', amount: 2000.45 },
            expected: '€2,000.45'
        },
        {
            input: {currency: '', amount: 2000.45 },
            expected: '2,000.45'
        },

    ];
    formatCurrencyTests.forEach(test => {
        it(`Should return ${test.expected}, given ${test.input.currency} currency and ${test.input.amount} amount`, () => {
            expect(formatCurrency(test.input.currency, test.input.amount)).toBe(test.expected)
        });
    });

})
