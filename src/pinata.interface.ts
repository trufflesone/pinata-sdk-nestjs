import { ModuleMetadata } from "@nestjs/common";

export interface PinataModuleOptions {
  apiKey: string;
  secretKey: string;
  gatewayUrl: string;
}

export interface PinataModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (
    ...args: any[]
  ) => PinataModuleOptions | Promise<PinataModuleOptions>;
  inject?: any[];
}
