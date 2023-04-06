import { DynamicModule } from "@nestjs/common";
export interface PinataModuleAsyncOptions {
    useFactory: (...args: any[]) => Promise<{
        apiKey: string;
        secretKey: string;
    }> | {
        apiKey: string;
        secretKey: string;
    };
    inject?: any[];
}
export declare class PinataModule {
    static forRoot(apiKey: string, secretKey: string): DynamicModule;
    static forRootAsync(options: PinataModuleAsyncOptions): DynamicModule;
}
