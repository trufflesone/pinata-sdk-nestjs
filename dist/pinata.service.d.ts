/// <reference types="node" />
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
export declare class PinataService {
    private httpService;
    private readonly apiKey;
    private readonly secretKey;
    private readonly gatewayUrl;
    constructor(httpService: HttpService, apiKey: string, secretKey: string, gatewayUrl: string);
    private getAuthHeaders;
    pinFile(file: Buffer): Observable<AxiosResponse>;
    pinJSON(json: any): Observable<AxiosResponse>;
    unpin(hash: string): Observable<AxiosResponse>;
    getPinnedItems(): Observable<AxiosResponse>;
}
