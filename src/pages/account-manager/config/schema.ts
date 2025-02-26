import type { IAccount } from "@entities/account";

import * as z from "zod";

const messageRequiredPassword = {
  message: "Пароль не может быть пустым",
};
const messageMaxLenPassword = {
  message: "Пароль не может быть более 100 символов",
};
const messageRequiredLogin = {
  message: "Логин не может быть пустым",
};
const messageMaxLenLogin = {
  message: "Логин не может быть более 100 символов",
};
const tagMaxLenLogin = {
  message: "Метка не может быть более 50 символов",
};
const recordTypeRequired = {
  message: "Тип записи не может быть пустым",
};

export const getAccountSchema = (account: IAccount) =>
  z
    .object({
      tag: z.string().max(50, tagMaxLenLogin).default(account.tag),
      recordType: z
        .enum(["Локальная", "LDAP"], recordTypeRequired)
        .default(account.recordType as "Локальная" | "LDAP"),
      login: z
        .string()
        .min(1, messageRequiredLogin)
        .max(100, messageMaxLenLogin)
        .default(account.login),
      password: z
        .string()
        .max(100, messageMaxLenPassword)
        .nullish()
        .default(account.password),
    })
    .superRefine((data, ctx) => {
      if (data.recordType === "Локальная" && !data.password) {
        ctx.addIssue({
          path: ["password"],
          message: messageRequiredPassword.message,
          code: z.ZodIssueCode.custom,
        });
      }
    });
