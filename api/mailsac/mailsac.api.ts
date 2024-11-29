import {
  APIRequestContext,
  APIResponse,
  expect,
  test,
} from "../../fixtures/fixtures";
import BaseAPI from "../base.api";
import { GetMsgListMailsacOptions, MailsacMessage } from "./mailsac.types";
import { CommonOptions } from "../base.types";
import { setTimeout } from "timers/promises";

export default class MailsacAPI extends BaseAPI {
  private API_TOKEN = process.env.MAILSAC_API_TOKEN;
  private HEADERS = {
    accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip,deflate,compress",
    "Mailsac-Key": this.API_TOKEN,
    Host: "mailsac.com",
  };

  constructor(request: APIRequestContext) {
    super(request, "https://mailsac.com/api");
    if (this.API_TOKEN === undefined)
      throw new Error("The API_TOKEN is not defined");
  }

  /**
   * Get a list of messages for the email address.
   * Messages are always sorted in descending order by when they were received, with the newest message always in the first position of the array.
   * @param email - email address. Example: `anything_123@mailsac.com`.
   * @returns a list of messages.
   */
  async getMsgList(
    email: string,
    params: GetMsgListMailsacOptions = {}
  ): Promise<MailsacMessage[]> {
    const requestName = "GET MSG LIST";
    let response: APIResponse;
    let body: MailsacMessage[];
    await test.step("Get a list of messages from the " + email, async () => {
      response = await this.errorHandler(requestName, async () => {
        return await this.request.get(
          `${this.BASE_URL}/addresses/${email}/messages`,
          {
            params: params as { [key: string]: string | number | boolean },
            headers: this.HEADERS,
          }
        );
      });
      body = await response.json();
      this.logToConsole(body, requestName);
    });
    return body;
  }

  /**
   * Get a message's HTML content.
   * Attached images are inlined and nothing has been stripped.
   * When no HTML body was sent in the original message, a simple HTML body will be created.
   * @param email - email address. Example: `anything_123@mailsac.com`.
   * @param messageId - mailsac-generated globally unique message identifier. Example: `m3phnJ2ag3example-0`.
   * @returns message HTML content as string.
   */
  async getMsgHtmlBody(email: string, messageId: string): Promise<string> {
    const requestName = "GET MSG HTML BODY";
    let response: APIResponse;
    let body: string;
    await test.step(
      "Get a HTML body of the message from the " + email,
      async () => {
        response = await this.errorHandler(requestName, async () => {
          return await this.request.get(
            `${this.BASE_URL}/dirty/${email}/${messageId}`,
            { headers: this.HEADERS }
          );
        });
        body = (await response.body()).toString();
        this.logToConsole(body, requestName);
      }
    );
    return body;
  }

  /**
   * Get a message by a subject.
   *
   * @param email - email address. Example: `anything_123@mailsac.com`.
   * @param subject - message subject.
   * @param options - options.
   * @returns message.
   */
  async getMsgBySubject(
    email: string,
    subject: string,
    options: Partial<CommonOptions> = {}
  ): Promise<MailsacMessage> {
    const { maxAttempts = 3, attemptTimeout = 5000 } = options ?? {};

    let message: MailsacMessage;
    await test.step(`Get a message by the subject: "${subject}"`, async () => {
      let messages: MailsacMessage[];
      for (let i = 0; i < maxAttempts; i++) {
        try {
          messages = await this.getMsgList(email);
          message = messages.find((msg: MailsacMessage) =>
            msg.subject.includes(subject)
          );
          expect(message).not.toBeUndefined();
          this.logToConsole(message, "GET MSG BY SUBJECT");
          break;
        } catch (error) {
          if (messages === undefined) throw error;
          console.log(
            `Attempt: ${
              i + 1
            }. There is no message with the subject "${subject}" for the "${email}" email`
          );
          await setTimeout(attemptTimeout);
          if (i === maxAttempts - 1)
            throw new Error(
              `There is no message with the subject "${subject}" for the "${email}" email after maximum attempts (${maxAttempts})`
            );
        }
      }
    });
    return message;
  }

  /**
   * Get a message's HTML content by a subject.
   *
   * @param email - email address. Example: `anything_123@mailsac.com`.
   * @param subject - message subject.
   * @param options - options.
   * @returns message HTML content as string.
   */
  async getMsgHtmlBodyBySubject(
    email: string,
    subject: string,
    options: Partial<CommonOptions> = {}
  ) {
    const msg = await this.getMsgBySubject(email, subject, options);
    const html = await this.getMsgHtmlBody(email, msg._id);
    this.logToConsole(html, "GET MSG HTML BODY BY SUBJECT");
    return html;
  }
}
