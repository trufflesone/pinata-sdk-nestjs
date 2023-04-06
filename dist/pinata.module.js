"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PinataModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinataModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const pinata_service_1 = require("./pinata.service");
let PinataModule = PinataModule_1 = class PinataModule {
    static forRoot(apiKey, secretKey) {
        return {
            module: PinataModule_1,
            imports: [axios_1.HttpModule],
            providers: [
                {
                    provide: pinata_service_1.PinataService,
                    useFactory: (httpService) => new pinata_service_1.PinataService(httpService, apiKey, secretKey),
                },
            ],
            exports: [pinata_service_1.PinataService],
        };
    }
    static forRootAsync(options) {
        return {
            module: PinataModule_1,
            imports: [axios_1.HttpModule],
            providers: [
                {
                    provide: pinata_service_1.PinataService,
                    useFactory: async (httpService, ...args) => {
                        const { apiKey, secretKey } = await options.useFactory(...args);
                        return new pinata_service_1.PinataService(httpService, apiKey, secretKey);
                    },
                    inject: options.inject
                        ? [axios_1.HttpService, ...options.inject]
                        : [axios_1.HttpService],
                },
            ],
            exports: [pinata_service_1.PinataService],
        };
    }
};
PinataModule = PinataModule_1 = __decorate([
    (0, common_1.Module)({})
], PinataModule);
exports.PinataModule = PinataModule;
