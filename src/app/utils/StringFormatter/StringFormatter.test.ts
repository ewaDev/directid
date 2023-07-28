import {describe, it, expect} from "@jest/globals";
import {formatAccountNumber, formatCurrency } from './StringFormatter'

describe('StringFormatter', () => {
    it('should format the string into 2 numbers followed by a dash', ()=> {
        expect(formatAccountNumber('112233')).toBe('11-22-33')
        expect(formatAccountNumber('1122331')).toBe('11-22-33-1')
        expect(formatAccountNumber('')).toBe('')
    })

    it('should format the balance a number with the approperiate currency', ()=> {
        expect(formatCurrency('USD', '2000')).toBe('$2000')
        expect(formatCurrency('GDP', '2000')).toBe('£2000')
        expect(formatCurrency('', '2000')).toBe('2000')
    })


})
