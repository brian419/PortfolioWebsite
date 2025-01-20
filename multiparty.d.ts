declare module 'multiparty' {
    export class Form {
        parse(
            req: any,
            callback: (err: Error | null, fields: any, files: Record<string, File[]>) => void
        ): void;
    }

    export interface File {
        fieldName: string;
        originalFilename: string;
        path: string;
        headers: Record<string, string>;
        size: number;
    }
}
