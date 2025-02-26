import type { Ref } from "vue";

import { commitAccount } from "../lib/helpers";
import type { IAccount } from "./types";

export const handleEditAccount = (
  accountsData: Ref<IAccount[]>,
  editedAccount: IAccount,
) => {
  commitAccount(accountsData, editedAccount);
};
