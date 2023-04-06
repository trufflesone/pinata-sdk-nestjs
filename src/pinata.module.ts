import { Module, DynamicModule, Provider } from "@nestjs/common";
import { HttpModule, HttpService } from "@nestjs/axios";
import { PinataService } from "./pinata.service";
import {
  PinataModuleAsyncOptions,
  PinataModuleOptions,
} from "./pinata.interface";

@Module({})
export class PinataModule {
  static forRoot(options: PinataModuleOptions): DynamicModule {
    return {
      module: PinataModule,
      imports: [HttpModule],
      providers: [
        {
          provide: PinataService,
          useFactory: (httpService) =>
            new PinataService(
              httpService,
              options.apiKey,
              options.gatewayUrl,
              options.secretKey
            ),
        },
      ],
      exports: [PinataService],
    };
  }

  static async forRootAsync(
    options: PinataModuleAsyncOptions
  ): Promise<DynamicModule> {
    const providers: Provider[] = [
      {
        provide: PinataService,
        useFactory: async (httpService: HttpService, ...args: any[]) => {
          const { apiKey, secretKey, gatewayUrl } = await options.useFactory(
            ...args
          );
          return new PinataService(httpService, apiKey, gatewayUrl, secretKey);
        },
        inject: options.inject
          ? [HttpService, ...options.inject]
          : [HttpService],
      },
    ];

    return {
      module: PinataModule,
      imports: [HttpModule],
      providers,
      exports: providers,
    };
  }
}
