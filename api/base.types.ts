export interface CommonOptions {
  /** Max attempts. Defaults to `3`. */
  maxAttempts: number;
  /** Timeout before attempts. Defaults to `5000` ms. */
  attemptTimeout: number;
}
