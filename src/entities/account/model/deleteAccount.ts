import type { Ref } from "vue";

import type { IAccount } from "./types";

export const handleDeleteAccount = (
  accountsData: Ref<IAccount[]>,
  deletedAccountId: string,
) => {
  accountsData.value = accountsData.value.filter(
    oldAccount => oldAccount.id !== deletedAccountId,
  );
  const savedAccounts = accountsData.value.filter(account => !account.isDirty);
  localStorage.setItem("accountsData", JSON.stringify(savedAccounts));
};
