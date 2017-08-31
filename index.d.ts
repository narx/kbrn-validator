
export as namespace kbrnValidator;

export interface ValidateResult {
    isValid: boolean;
    message: string;
    information?: Information;
}

export interface Information {
    taxOfficeCode: string;
    typeCode: string;
    type: string;
    detailType: string;
    isTaxFree : boolean;
    taxType: string;
}

export function validate(kbrn: string): ValidateResult;

