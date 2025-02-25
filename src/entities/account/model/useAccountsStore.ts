import { computed, ref } from "vue";

import type { IAccount } from "./types";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useAccountsStore = defineStore("accounts", () => {
  const getAccountsFromLocalStorage = (): IAccount[] => {
    const storedAccounts = localStorage.getItem("accountsData");
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  };

  const initialAccounts = getAccountsFromLocalStorage();

  const accountsData = ref<IAccount[]>(
    initialAccounts.length > 0
      ? initialAccounts
      : [
          {
            id: uuidv4(),
            tag: "TAG1",
            recordType: "Локальная",
            login: "1234",
            password: "qwer",
            isDirty: false,
          },
          {
            id: uuidv4(),
            tag: "TAG2",
            recordType: "LDAP",
            login: "2345",
            password: "wert",
            isDirty: false,
          },
        ],
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
    const savedAccounts = accountsData.value.filter(
      account => !account.isDirty,
    );
    localStorage.setItem("accountsData", JSON.stringify(savedAccounts));
  };

  const saveAccount = (newAccount: IAccount) => {
    commitAccount(newAccount);
  };

  const editAccount = (updatedAccount: IAccount) => {
    commitAccount(updatedAccount);
  };

  return {
    accounts,
    addAccount,
    saveAccount,
    editAccount,
  };
});
