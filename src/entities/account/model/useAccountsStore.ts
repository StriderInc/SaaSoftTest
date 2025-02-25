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
          },
          {
            id: uuidv4(),
            tag: "TAG2",
            recordType: "LDAP",
            login: "2345",
            password: "wert",
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

  const saveAccount = (newAccount: IAccount) => {
    const filterAccount = accountsData.value.filter(item => !item.isDirty);
    localStorage.setItem(
      "accountsData",
      JSON.stringify([...filterAccount, newAccount]),
    );
  };

  return {
    accounts,
    addAccount,
    saveAccount,
  };
});
