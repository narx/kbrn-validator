declare module 'kbrn-validator' {
    namespace KbrnValidator {
        interface ValidateResult {
            isValid: boolean;
            message: string;
            information?: Information;
        }
        interface Information {
            taxOfficeCode: string;
            typeCode: string;
            type: string;
            detailType: string;
            isTaxFree : boolean;
            taxType: string;
        }
        function validate(kbrn: string): ValidateResult;
    }
}   