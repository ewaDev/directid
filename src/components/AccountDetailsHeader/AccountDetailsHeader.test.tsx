import {render, screen} from '@testing-library/react';
import React from "react";
import '@testing-library/jest-dom';
import {AccountDetailsHeader} from './AccountDetailsHeader.component';
import {test, expect} from "@jest/globals";


test('loads and displays card greeting', async () => {
    render(<AccountDetailsHeader
        accountHolderNames={'The Groke'}
        availableBalance={'£10,000.30'}
        currencyCode='GDP'
        accountNumber='19090'
        bankCode='1009903'/>
    );

    expect(screen.getByAltText('directid logo')).toBeDefined();
    expect(screen.getByText('User Transactions (GDP)')).toBeDefined();
    expect(screen.getByText('The Groke')).toBeDefined();
    expect(screen.getByText('£10,000.30')).toBeDefined();
    expect(screen.getByText('Branch Code: 10-09-90-3')).toBeDefined();
});
