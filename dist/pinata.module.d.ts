import { DynamicModule } from "@nestjs/common";
import { PinataModuleAsyncOptions, PinataModuleOptions } from "./pinata.interface";
export declare class PinataModule {
    static forRoot(options: PinataModuleOptions): DynamicModule;
    static forRootAsync(options: PinataModuleAsyncOptions): Promise<DynamicModule>;
}
