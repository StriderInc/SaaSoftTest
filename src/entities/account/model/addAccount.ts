import type { Ref } from "vue";

import type { IAccount } from "./types";
import { v4 as uuidv4 } from "uuid";

export const handleAddAccount = (accountsData: Ref<IAccount[]>) => {
  accountsData.value.push({
    id: uuidv4(),
    tag: "",
    recordType: "",
    login: "",
    password: "",
    isDirty: true,
  });
};
