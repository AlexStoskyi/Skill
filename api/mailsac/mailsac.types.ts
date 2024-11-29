export interface AccountInfoMailsac {
  allowMultipleUsers?: number;
  _id?: string;
  email?: string;
  invoiceEmail?: string;
  stripeId?: string;
  disableSpam?: boolean;
  capturePrivate?: boolean;
  messageLimit?: number;
  sendsRemaining?: number;
  privateDomain?: number;
  privateAddressCredits?: number;
  catchAll?: number;
  recents?: string[];
  labels?: string[];
  company?: string;
  address?: string;
  whitelistAccess?: number;
  moAPICount?: number;
  apiMonthlyLimit?: number;
}

export interface GetMsgListMailsacOptions {
  /**
   * Return messages returned up to this UTC date. Example: `until=1985-04-12T23:20:50.52Z`
   */
  until?: string;
  /**
   * Limit results to this many. Default: `20`
   */
  limit?: number;
}

export interface IsAPILimitReached {
  _id: string;
  status: boolean;
  moAPICount: number;
  apiMonthlyLimit: number;
  offset: number;
}

export interface MailsacMessage {
  _id: string;
  from: [
    {
      address: string;
      name: string;
    },
  ];
  to: [
    {
      address: string;
      name: string;
    },
  ];
  cc: string[];
  bcc: string[];
  subject: string;
  savedBy: string;
  inbox: string;
  originalInbox: string;
  domain: string;
  received: string;
  size: number;
  attachments: string[];
  ip: string;
  via: string;
  folder: string;
  labels: string[];
  read: null;
  rtls: true;
  links: string[];
  spam: 0;
}
