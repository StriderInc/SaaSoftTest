import type { IAccount, ISavedAccount } from "../model/types";

export const preprocessAccounts = (
  initialAccounts: ISavedAccount[],
): IAccount[] =>
  initialAccounts.map((account: ISavedAccount): IAccount => {
    const joinedTag = account.tag.map(tag => tag.text).join(";");
    return { ...account, tag: joinedTag };
  });
