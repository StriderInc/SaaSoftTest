import type { Ref } from "vue";

import type { IAccount, ISavedAccount } from "../model/types";
import { preprocessAccounts } from "./utils";

export const commitAccount = (
  accountsData: Ref<IAccount[]>,
  account: IAccount,
) => {
  accountsData.value = accountsData.value.map(oldAccount =>
    oldAccount.id === account.id ? account : oldAccount,
  );
  const savedAccounts = accountsData.value.reduce(
    (accum: ISavedAccount[], account: IAccount) => {
      if (!account.isDirty) {
        const tagArr = account.tag.split(";").map(tag => ({
          text: tag.trim(),
        }));
        const accountCopy = { ...account, tag: tagArr };
        return [...accum, accountCopy];
      }
      return accum;
    },
    [],
  );
  localStorage.setItem("accountsData", JSON.stringify(savedAccounts));
};

export const getAccountsFromLocalStorage = (): IAccount[] => {
  const storedAccounts = localStorage.getItem("accountsData");
  if (storedAccounts) {
    const initialAccounts = JSON.parse(storedAccounts);
    return preprocessAccounts(initialAccounts);
  }
  return storedAccounts ? JSON.parse(storedAccounts) : [];
};
