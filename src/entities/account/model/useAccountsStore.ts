import { computed, ref } from "vue";

import { defaultAccountData } from "../constants/initAccountData";
import type { IAccount, ISavedAccount } from "./types";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useAccountsStore = defineStore("accounts", () => {
  const getAccountsFromLocalStorage = (): IAccount[] => {
    const storedAccounts = localStorage.getItem("accountsData");
    if (storedAccounts) {
      const initialAccounts = JSON.parse(storedAccounts);
      const preprocessAccounts = initialAccounts.map(
        (account: ISavedAccount) => {
          const joinedTag = account.tag.map(tag => tag.text).join(";");
          return { ...account, tag: joinedTag };
        },
      );
      return preprocessAccounts;
    }
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  };

  const initialAccounts = getAccountsFromLocalStorage();

  const accountsData = ref<IAccount[]>(
    initialAccounts.length > 0 ? initialAccounts : defaultAccountData,
  );

  const accounts = computed(() => accountsData.value);

  const addAccount = () => {
    accountsData.value.push({
      id: uuidv4(),
      tag: "",
      recordType: "",
      login: "",
      password: "",
      isDirty: true,
    });
  };

  const commitAccount = (account: IAccount) => {
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

  const saveAccount = (newAccount: IAccount) => {
    commitAccount(newAccount);
  };

  const editAccount = (editedAccount: IAccount) => {
    commitAccount(editedAccount);
  };

  const deleteAccount = (deletedAccountId: string) => {
    accountsData.value = accountsData.value.filter(
      oldAccount => oldAccount.id !== deletedAccountId,
    );
    const savedAccounts = accountsData.value.filter(
      account => !account.isDirty,
    );
    localStorage.setItem("accountsData", JSON.stringify(savedAccounts));
  };

  return {
    accounts,
    addAccount,
    saveAccount,
    editAccount,
    deleteAccount,
  };
});
