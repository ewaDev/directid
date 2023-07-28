export function formatBranchCode (bankAccount:string) : string {
    const splitStringArray = bankAccount.match(/.{1,2}/g);
    return splitStringArray ? splitStringArray.join('-'): '';
}

function getCurrency(currencyCode: string): string {
    switch(currencyCode) {
        case 'USD':
            return '$'
        case 'GDP':
            return '£'
        default:
        return ''
    }
}
export function formatCurrency(currencyCode: string, amount:string): string {
    const number = parseFloat(amount.replace(/,/g, '')); // Remove existing commas and parse to number

    return getCurrency(currencyCode) + number.toLocaleString()

}
