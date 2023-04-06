import { Global, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

@Injectable()
export class PinataService {
  private readonly apiKey: string;
  private readonly secretKey: string;
  private readonly gatewayUrl: string;

  constructor(
    private httpService: HttpService,
    apiKey: string,
    secretKey: string,
    gatewayUrl: string
  ) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.gatewayUrl = gatewayUrl;
  }

  private getAuthHeaders(): Record<string, string> {
    return {
      pinata_api_key: this.apiKey,
      pinata_secret_api_key: this.secretKey,
    };
  }

  public pinFile(file: Buffer): Observable<AxiosResponse> {
    const url = `${this.gatewayUrl}/pinning/pinFileToIPFS`;
    const headers = {
      ...this.getAuthHeaders(),
      "Content-Type": "application/octet-stream",
    };

    return this.httpService.post(url, file, { headers });
  }

  public pinJSON(json: any): Observable<AxiosResponse> {
    const url = `${this.gatewayUrl}/pinning/pinJSONToIPFS`;
    const headers = {
      ...this.getAuthHeaders(),
      "Content-Type": "application/json",
    };

    return this.httpService.post(url, json, { headers });
  }

  public unpin(hash: string): Observable<AxiosResponse> {
    const url = `${this.gatewayUrl}/pinning/unpin/${hash}`;
    const headers = this.getAuthHeaders();

    return this.httpService.delete(url, { headers });
  }

  public getPinnedItems(): Observable<AxiosResponse> {
    const url = `${this.gatewayUrl}/data/pinList`;
    const headers = this.getAuthHeaders();

    return this.httpService.get(url, { headers });
  }

  // Implement other Pinata API methods here.
}
