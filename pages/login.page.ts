import { BasePage } from './page';
import endpoint from '../constants/endpoints.constants.json';
import { APIRequestContext } from '@playwright/test';
import { test, expect } from '../fixtures/fixtures';
import MailsacAPI from '../api/mailsac/mailsac.api';

export class LoginPage extends BasePage {
    get emailInputField() {
        return this.page.locator(`[class*=form-control]`);
    }

    get magicLinkBtn() {
        return this.page.locator(`[class*=btn-primary]`);
    }

    get successPopUp() {
        return this.page.locator(`[id*=b7-Container]`);
    }

    async clickOnSendMagicLinkBtn() {
        await super.clickElement(this.magicLinkBtn);
        await super.waitForElement(this.successPopUp);
    }

    async fillEmailInput(data: string) {
        await super.fillData(this.emailInputField, data);
    }

    async open() {
        await super.open(endpoint.login);
    }

    async login(userEmail: string, request: APIRequestContext) {
        const mailAPI = new MailsacAPI(request);

        await test.step(`Login with "${userEmail}" email`, async () => {
            await this.open();
            await this.fillEmailInput(userEmail);
            await this.clickOnSendMagicLinkBtn();
            await expect(this.successPopUp).toBeVisible();
            const html = await mailAPI.getMsgHtmlBodyBySubject(userEmail, `Confirmation email for ${userEmail}`, { attemptTimeout: 10000 });
            await this.openHTML(html.replaceAll('target="_blank"', ''), {
                htmlTitle: `Confirmation email for ${userEmail}`,
            });
            await this.page.locator(`a[enabled="true"] `).first().click();
            await expect(this.page).toHaveURL(`${process.env.BASE_URL!}/${endpoint.home}`);
        });
    }
}
