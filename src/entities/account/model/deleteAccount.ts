import type { Ref } from "vue";

import { preprocessSavedAccounts } from "../lib/utils";
import type { IAccount } from "./types";

export const handleDeleteAccount = (
  accountsData: Ref<IAccount[]>,
  deletedAccountId: string,
) => {
  accountsData.value = accountsData.value.filter(
    oldAccount => oldAccount.id !== deletedAccountId,
  );
  const savedAccounts = preprocessSavedAccounts(accountsData);
  localStorage.setItem("accountsData", JSON.stringify(savedAccounts));
};
