import { computed, ref } from "vue";

import { DEFAULT_ACCOUNT_DATA } from "../constants/defaultAccountData";
import { getAccountsFromLocalStorage } from "../lib/helpers";
import { handleAddAccount } from "./addAccount";
import { handleDeleteAccount } from "./deleteAccount";
import { handleEditAccount } from "./editAccount";
import { handleSaveAccount } from "./saveAccount";
import type { IAccount } from "./types";
import { defineStore } from "pinia";

export const useAccountsStore = defineStore("accounts", () => {
  const initialAccounts = getAccountsFromLocalStorage();

  const accountsData = ref<IAccount[]>(
    initialAccounts.length > 0 ? initialAccounts : DEFAULT_ACCOUNT_DATA,
  );

  const accounts = computed(() => accountsData.value);

  const addAccount = () => handleAddAccount(accountsData);

  const saveAccount = (newAccount: IAccount) =>
    handleSaveAccount(accountsData, newAccount);

  const editAccount = (editedAccount: IAccount) =>
    handleEditAccount(accountsData, editedAccount);

  const deleteAccount = (deletedAccountId: string) =>
    handleDeleteAccount(accountsData, deletedAccountId);

  return {
    accounts,
    addAccount,
    saveAccount,
    editAccount,
    deleteAccount,
  };
});
