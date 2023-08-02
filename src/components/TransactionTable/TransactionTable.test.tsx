import {fireEvent, render, screen} from '@testing-library/react';
import React from "react";
import '@testing-library/jest-dom';
import {test, expect} from "@jest/globals";
import TransactionTable from "@/components/TransactionTable/TransactionTable.component";
import {CustomerTransactionData} from "@/types/Transaction";

const customerTransactions: Array<CustomerTransactionData> = [
    {
        transactionId: 'id1',
        description: 'Tesco',
        date: '2023-12-12T00:00:00Z',
        category: 'Shopping',
        debit: '-',
        credit: '£100',
        balance: '£200'
    },
    {
        transactionId: 'id2',
        description: 'Work',
        date: '2023-12-13T00:00:00Z',
        category: 'Payment',
        debit: '£100',
        credit: '-',
        balance: '£300'
    },
];
test('should load and correctly display table', async () => {
    render(<TransactionTable customerTransactions={customerTransactions}/>);

    expect(screen.getByText('Transaction')).toBeDefined();
    expect(screen.getByText('Date')).toBeDefined();
    expect(screen.getByText('Category')).toBeDefined();
    expect(screen.getByText('Debit')).toBeDefined();
    expect(screen.getByText('Credit')).toBeDefined();
    expect(screen.getByText('Balance')).toBeDefined();
    expect(screen.getByText('Tesco')).toBeDefined();
    expect(screen.getByText('Work')).toBeDefined();
    expect(screen.getByText('13/12/2023')).toBeDefined();
    expect(screen.getByText('First')).toBeDefined();
    expect(screen.getByText('Next')).toBeDefined();
    expect(screen.getByText('1 of 1')).toBeDefined();
    expect(screen.getByText('Previous')).toBeDefined();
    expect(screen.getByText('Last')).toBeDefined();
});

test('Should navigate to next page', async () => {
    const bulkTransactions: Array<CustomerTransactionData> = Array.from({length: 40}, (_, index) => ({
        transactionId: index.toString(), description: 'Work',
        date: '2023-12-13T00:00:00Z',
        category: 'Payment',
        debit: '£100',
        credit: '-',
        balance: '£300'
    }));

    render(<TransactionTable customerTransactions={bulkTransactions}/>);

    expect(screen.getByText('1 of 3')).toBeDefined();

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(screen.getByText('2 of 3')).toBeDefined();

    const lastButton = screen.getByText('Last');
    fireEvent.click(lastButton);
    expect(screen.getByText('3 of 3')).toBeDefined();

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);
    expect(screen.getByText('2 of 3')).toBeDefined();

    const firstButton = screen.getByText('First');
    fireEvent.click(firstButton);
    expect(screen.getByText('1 of 3')).toBeDefined();
});

test('should add arrow when sorting by date', async () => {
    render(<TransactionTable customerTransactions={customerTransactions}/>);
    expect(screen.queryAllByAltText('arrow up icon').length).toBe(0);

    const dateHeader = screen.getByText('Date');
    expect(dateHeader).toBeDefined();

    fireEvent.click(dateHeader);
    expect(screen.queryAllByAltText('arrow up icon').length).toBe(1);

    fireEvent.click(dateHeader);
    expect(screen.queryAllByAltText('arrow down icon').length).toBe(1);

    const categoryHeader = screen.getByText('Category');
    expect(categoryHeader).toBeDefined();

    fireEvent.click(categoryHeader);
    expect(screen.queryAllByAltText('arrow up icon').length).toBe(1);

    fireEvent.click(categoryHeader);
    expect(screen.queryAllByAltText('arrow down icon').length).toBe(2);
});
