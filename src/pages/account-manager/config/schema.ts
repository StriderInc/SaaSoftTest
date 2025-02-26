import type { IAccount } from "@entities/account";

import {
  MESSAGE_MAX_LEN_LOGIN,
  MESSAGE_MAX_LEN_PASSWORD,
  MESSAGE_MAX_LEN_TAG,
  MESSAGE_MAX_RECORD_TYPE,
  MESSAGE_REQUIRED_LOGIN,
  MESSAGE_REQUIRED_PASSWORD,
} from "../constatnts/zodMassages";
import * as z from "zod";

export const getAccountSchema = (account: IAccount) =>
  z
    .object({
      tag: z.string().max(50, MESSAGE_MAX_LEN_TAG).default(account.tag),
      recordType: z
        .enum(["Локальная", "LDAP"], MESSAGE_MAX_RECORD_TYPE)
        .default(account.recordType as "Локальная" | "LDAP"),
      login: z
        .string()
        .min(1, MESSAGE_REQUIRED_LOGIN)
        .max(100, MESSAGE_MAX_LEN_LOGIN)
        .default(account.login),
      password: z
        .string()
        .max(100, MESSAGE_MAX_LEN_PASSWORD)
        .nullish()
        .default(account.password),
    })
    .superRefine((data, ctx) => {
      if (data.recordType === "Локальная" && !data.password) {
        ctx.addIssue({
          path: ["password"],
          message: MESSAGE_REQUIRED_PASSWORD.message,
          code: z.ZodIssueCode.custom,
        });
      }
    });
