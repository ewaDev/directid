import {describe, it, expect} from "@jest/globals";
import {capitaliseWordsInSentence, formatBranchCode, formatCurrency} from './StringFormatter';

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
    ];

    formatBranchCodeTests.forEach(test => {
        it(`should format the string ${test.input} into 2 numbers followed by a dash`, () => {
            expect(formatBranchCode(test.input)).toBe(test.expected);
        });
    });

    const formatCurrencyTests = [
        {
            input: {countryCode: 'us',currency: 'USD', amount: 2000.00 },
            expected: '$2,000.00'
        },
        {
            input: {countryCode: 'gb', currency: 'GBP', amount: 2000 },
            expected: '£2,000.00'
        },
        {
            input: { countryCode: 'gb', currency: 'GBP', amount: 2000.45 },
            expected: '£2,000.45'
        },
        {
            input: {countryCode: 'be', currency: 'EUR', amount: 2000.45 },
            expected: '€2,000.45'
        },
        {
            input: {countryCode: '', currency: '', amount: 2000.45 },
            expected: '2,000.45'
        },

    ];
    formatCurrencyTests.forEach(test => {
        it(`Should return ${test.expected}, given ${test.input.currency} currency and ${test.input.amount} amount`, () => {
            expect(formatCurrency(test.input.countryCode, test.input.currency, test.input.amount)).toBe(test.expected);
        });
    });


    const capitaliseSentencesTests = [
        {
            input: 'hello world!',
            expected: 'Hello World!'
        },
        {
            input: 'mAnGlEd SeNtEnCE',
            expected: 'Mangled Sentence'
        },

    ];
    capitaliseSentencesTests.forEach(test => {
        it(`Should return ${test.expected}, given ${test.input}`, () => {
            expect(capitaliseWordsInSentence(test.input)).toBe(test.expected);
        });
    });

});
