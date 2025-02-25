export interface IAccount {
  id: string;
  tag: string;
  recordType: "Локальная" | "LDAP" | "";
  login: string;
  password: string | null;
  isDirty: boolean;
}
