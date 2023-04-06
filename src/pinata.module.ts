import { Module, DynamicModule, Provider } from "@nestjs/common";
import { HttpModule, HttpService } from "@nestjs/axios";
import { PinataService } from "./pinata.service";

export interface PinataModuleAsyncOptions {
    useFactory: (
      ...args: any[]
    ) => Promise<{ apiKey: string; secretKey: string }> | { apiKey: string; secretKey: string };
    inject?: any[];
  }

@Module({})
export class PinataModule {
  static forRoot(apiKey: string, secretKey: string): DynamicModule {
    return {
      module: PinataModule,
      imports: [HttpModule],
      providers: [
        {
          provide: PinataService,
          useFactory: (httpService) =>
            new PinataService(httpService, apiKey, secretKey),
        },
      ],
      exports: [PinataService],
    };
  };
  static forRootAsync(options: PinataModuleAsyncOptions): DynamicModule {
    return {
      module: PinataModule,
      imports: [HttpModule],
      providers: [
        {
          provide: PinataService,
          useFactory: async (httpService: HttpService, ...args: any[]) => {
            const { apiKey, secretKey } = await options.useFactory(...args);
            return new PinataService(httpService, apiKey, secretKey);
          },
          inject: options.inject ? [HttpService, ...options.inject] : [HttpService],
        },
      ],
      exports: [PinataService],
    };
  }
}
