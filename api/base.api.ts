import { APIRequestContext, APIResponse, expect } from "../fixtures/fixtures";
// import { logToConsole } from '@utils/console.util';
import { setTimeout } from "timers/promises";

interface ErrorHandlerOptions {
  retriesNumber?: number;
  timeout?: number;
}

export default class BaseAPI {
  protected request: APIRequestContext;
  protected BASE_URL: string;
  protected REQUEST_RETRIES = 5;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.BASE_URL = baseURL;
  }

  /**
   * Error handler that repeats the API request if an error occurs.
   * If an error occurs after the maximum number of attempts, it throws the error.
   *
   * @param callback - API request
   * @returns API response
   */
  protected async errorHandler(
    requestName: string,
    callback: () => Promise<APIResponse>,
    options?: ErrorHandlerOptions
  ): Promise<APIResponse> {
    const { retriesNumber = this.REQUEST_RETRIES, timeout = 5000 } =
      options ?? {};

    let response: APIResponse;
    for (let i = 0; i < retriesNumber; i++) {
      try {
        response = await callback();
        expect(response.ok()).toBeTruthy();
        return response;
      } catch (error) {
        await setTimeout(timeout);

        if (i === retriesNumber - 1) {
          this.logToConsole(
            `Error: ${requestName}`,
            await response.json(),
            "error"
          );
          throw error;
        }
      }
    }
  }

  protected logToConsole(
    body: string | object,
    requestName: string,
    level = "debug"
  ) {
    console.log(`${requestName} ==> ${JSON.stringify(body, undefined, 0)}`);
  }
}
