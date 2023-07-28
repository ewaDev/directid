import {describe, it, expect} from "@jest/globals";
import {formatBranchCode, formatCurrency } from './StringFormatter'

describe('StringFormatter', () => {
    it('should format the string into 2 numbers followed by a dash', ()=> {
        expect(formatBranchCode('112233')).toBe('11-22-33')
        expect(formatBranchCode('1122331')).toBe('11-22-33-1')
        expect(formatBranchCode('')).toBe('')
    })

    it('should format the balance a number with the appropriate currency', ()=> {
        expect(formatCurrency('USD', 2000)).toBe('$2,000.00')
        expect(formatCurrency('GDP', 2000)).toBe('£2,000.00')
        expect(formatCurrency('GDP', 2000.45)).toBe('£2,000.45')
        expect(formatCurrency('GDP', 2000.40)).toBe('£2,000.40')
        expect(formatCurrency('', 2342000)).toBe('2,342,000.00')
    })
})
