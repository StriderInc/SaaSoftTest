import type { Ref } from "vue";

import type { IAccount, ISavedAccount } from "../model/types";

export const preprocessAccounts = (
  initialAccounts: ISavedAccount[],
): IAccount[] =>
  initialAccounts.map((account: ISavedAccount): IAccount => {
    const joinedTag = account.tag.map(tag => tag.text).join(";");
    return { ...account, tag: joinedTag };
  });

export const preprocessSavedAccounts = (accountsData: Ref<IAccount[]>) =>
  accountsData.value.reduce((accum: ISavedAccount[], account: IAccount) => {
    if (!account.isDirty) {
      const tagArr = account.tag.split(";").map(tag => ({
        text: tag.trim(),
      }));
      const accountCopy = { ...account, tag: tagArr };
      return [...accum, accountCopy];
    }
    return accum;
  }, []);
