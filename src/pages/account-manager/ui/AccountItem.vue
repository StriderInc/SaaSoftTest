<script setup lang="ts">
import { DeleteAccount } from "@features/delete-account";
import type { IAccount } from "@entities/account";
import {
  AutoForm,
  AutoFormField,
  type Config,
} from "@shared/ui/shadcn/auto-form";

import { fieldConfig } from "../config/fieldConfig";
import { getAccountSchema } from "../config/schema";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { z } from "zod";

interface IAccountFormProps {
  account: IAccount;
}

const props = defineProps<IAccountFormProps>();
const emmit = defineEmits(["saveAccount", "editAccount", "deleteAccount"]);

const schema = getAccountSchema(props.account);

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const handleCheckField = async () => {
  if (form.values.recordType === "LDAP") {
    form.setFieldValue("password", null);
  } else if (!form.values.password) {
    return form.setFieldError("password", "err");
  }

  const { valid } = await form.validate();
  if (!valid) return;

  if (props.account.isDirty) {
    const savedAccount = {
      id: props.account.id,
      isDirty: false,
      ...form.values,
    };
    return emmit("saveAccount", savedAccount);
  }
  const editedAccount = { ...props.account, ...form.values };
  emmit("editAccount", editedAccount);
};

const handleDeleteAccount = (deletedId: string) => {
  emmit("deleteAccount", deletedId);
};
</script>

<template>
  <AutoForm
    class="flex items-center justify-center"
    :schema="schema"
    :form="form"
    :field-config="fieldConfig as Config<z.infer<typeof schema>>"
  >
    <template #customAutoForm="{ fields }">
      <div
        class="grid grid-cols-[1fr_1fr_1fr_1fr_max-content] grid-rows-[auto_1fr] gap-[10px] w-[50%]"
      >
        <AutoFormField
          v-bind="fields.tag"
          @blur="handleCheckField"
        />
        <AutoFormField
          v-bind="fields.recordType"
          @update:model-value="handleCheckField"
        />
        <AutoFormField
          v-bind="fields.login"
          :class="{
            'col-span-2': form.values.recordType === 'LDAP',
          }"
          @blur="handleCheckField"
        />
        <div v-if="form.values.recordType !== 'LDAP'">
          <AutoFormField
            v-bind="fields.password"
            @blur="handleCheckField"
          />
        </div>
        <DeleteAccount @delete-account="handleDeleteAccount(account.id)" />
      </div>
    </template>
  </AutoForm>
</template>

<style scoped></style>
