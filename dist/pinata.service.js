"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinataService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let PinataService = class PinataService {
    constructor(httpService, apiKey, secretKey) {
        this.httpService = httpService;
        this.baseUrl = "https://api.pinata.cloud";
        this.apiKey = apiKey;
        this.secretKey = secretKey;
    }
    getAuthHeaders() {
        return {
            pinata_api_key: this.apiKey,
            pinata_secret_api_key: this.secretKey,
        };
    }
    pinFile(file) {
        const url = `${this.baseUrl}/pinning/pinFileToIPFS`;
        const headers = Object.assign(Object.assign({}, this.getAuthHeaders()), { "Content-Type": "application/octet-stream" });
        return this.httpService.post(url, file, { headers });
    }
    pinJSON(json) {
        const url = `${this.baseUrl}/pinning/pinJSONToIPFS`;
        const headers = Object.assign(Object.assign({}, this.getAuthHeaders()), { "Content-Type": "application/json" });
        return this.httpService.post(url, json, { headers });
    }
    unpin(hash) {
        const url = `${this.baseUrl}/pinning/unpin/${hash}`;
        const headers = this.getAuthHeaders();
        return this.httpService.delete(url, { headers });
    }
    getPinnedItems() {
        const url = `${this.baseUrl}/data/pinList`;
        const headers = this.getAuthHeaders();
        return this.httpService.get(url, { headers });
    }
};
PinataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, String, String])
], PinataService);
exports.PinataService = PinataService;
//# sourceMappingURL=pinata.service.js.map