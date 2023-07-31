export function formatBranchCode (bankAccount:string) : string {
    const splitStringArray = bankAccount.match(/.{1,2}/g);
    return splitStringArray ? splitStringArray.join('-'): '';
}

export function formatCurrency(currencyCode: string = 'GDP', amount:number): string {
    if(currencyCode === ''){
        return amount.toLocaleString('en-us', { minimumFractionDigits: 2});
    }

    return amount.toLocaleString('en-us', { minimumFractionDigits: 2, style: 'currency', currency: currencyCode});

}
