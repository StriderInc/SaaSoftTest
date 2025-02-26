import type { IAccount } from "../model/types";
import { v4 as uuidv4 } from "uuid";

export const DEFAULT_ACCOUNT_DATA: IAccount[] = [
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
    password: null,
    isDirty: false,
  },
];
