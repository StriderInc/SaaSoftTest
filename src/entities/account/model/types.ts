interface ITag {
  text: string;
}

interface IBaseAccount {
  id: string;
  recordType: "Локальная" | "LDAP" | "";
  login: string;
  password: string | null;
  isDirty: boolean;
}

export interface IAccount extends IBaseAccount {
  tag: string;
}

export interface ISavedAccount extends IBaseAccount {
  tag: ITag[];
}
