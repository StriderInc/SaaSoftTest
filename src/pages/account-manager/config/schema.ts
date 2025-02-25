import type { IAccount } from "@entities/account";

import * as z from "zod";

export const getAccountSchema = (account: IAccount) =>
  z.object({
    tag: z.string().min(1).max(50).default(account.tag),
    recordType: z
      .enum(["Локальная", "LDAP"])
      .default(account.recordType as "Локальная" | "LDAP"),
    login: z.string().min(1).default(account.login),
    password: z
      .string()
      .min(1)
      .default(account.password as string),
  });

export type AccountZodValues = z.infer<ReturnType<typeof getAccountSchema>>;
