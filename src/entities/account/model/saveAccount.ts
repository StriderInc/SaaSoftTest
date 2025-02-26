import type { Ref } from "vue";

import { commitAccount } from "../lib/helpers";
import type { IAccount } from "./types";

export const handleSaveAccount = (
  accountsData: Ref<IAccount[]>,
  newAccount: IAccount,
) => {
  commitAccount(accountsData, newAccount);
};
