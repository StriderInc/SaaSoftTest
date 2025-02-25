interface ITag {
  text: string;
}

interface IBaseAccount {
  id: string;
  recordType: "Локальная" | "LDAP" | "";
  login: string;
  password: string | null;
}

export interface IAccount extends IBaseAccount {
  isDirty: boolean;
  tag: string;
}

export interface ISavedAccount extends IBaseAccount {
  tag: ITag[];
}
