import { betterAuth } from "better-auth";

type VerificationRequestOptions = {
  identifier: string;
  url: string;
  expiresAt: Date;
};

export const auth = betterAuth({
  database: {
    provider: "postgres",
    url: process.env.DATABASE_URL!,
    adapter: {
      user: {
        fields: {
          role: true,
        },
      },
    },
  },

  email: {
    async sendVerificationRequest(options: VerificationRequestOptions) {
      const { identifier, url, expiresAt } = options;

      console.info(`Verification email → ${identifier}`);
      console.info(`Magic link: ${url}`);
      console.info(`Expires at: ${expiresAt.toISOString()}`);
    },
  },
});

export async function getSession() {
  return auth.api.getSession();
}

export const handler = auth.handler;
