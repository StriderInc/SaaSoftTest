import type { Ref } from "vue";

import type { IAccount } from "../model/types";
import { preprocessAccounts, preprocessSavedAccounts } from "./utils";

export const commitAccount = (
  accountsData: Ref<IAccount[]>,
  account: IAccount,
) => {
  accountsData.value = accountsData.value.map(oldAccount =>
    oldAccount.id === account.id ? account : oldAccount,
  );
  const savedAccounts = preprocessSavedAccounts(accountsData);
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
