import type { EmitFn } from "vue";

import type { IAccount } from "@entities/account";

import { useForm } from "vee-validate";

export const checkField = async (
  form: ReturnType<typeof useForm>,
  account: IAccount,
  emmit: EmitFn<["saveAccount", "editAccount", "deleteAccount"]>,
) => {
  const { valid } = await form.validate();
  if (!form.values.recordType) {
    form.setFieldError("password", "Пароль не может быть пустым");
  }
  if (!valid) return;
  if (form.values.recordType === "LDAP") {
    form.setFieldValue("password", null);
  }

  if (account.isDirty) {
    const savedAccount = {
      id: account.id,
      isDirty: false,
      ...form.values,
    };
    return emmit("saveAccount", savedAccount);
  }
  const editedAccount = { ...account, ...form.values };
  emmit("editAccount", editedAccount);
};
