export function formatBranchCode (bankAccount:string) : string {
    const splitStringArray = bankAccount.match(/.{1,2}/g);
    return splitStringArray ? splitStringArray.join('-'): '';
}

export function formatCurrency(countryCode:string = 'gb', currencyCode: string = 'GDP', amount:number): string {
    if(currencyCode === ''){
        return amount.toLocaleString('en-us', { minimumFractionDigits: 2});
    }


    return amount.toLocaleString(`en-${countryCode.toLowerCase()}`, { minimumFractionDigits: 2, style: 'currency', currency: currencyCode});

}

export function capitaliseWordsInSentence(sentence: string) : string {
    const words = sentence.toLowerCase().split(' ');

    return words.map((word) => {
        if (word.length > 0) {
            return word[0].toUpperCase() + word.slice(1);
        } else {
            return word;
        }
    }).join(' ');

}
