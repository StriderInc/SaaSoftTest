<script setup lang="ts">
import { computed } from "vue";

import AccountValidateErrorTooltip from "@pages/account-manager/ui/AccountValidateErrorTooltip.vue";
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
  const { valid } = await form.validate();
  if (!form.values.recordType) {
    form.setFieldError("password", "Пароль не может быть пустым");
  }
  if (!valid) return;
  if (form.values.recordType === "LDAP") {
    form.setFieldValue("password", null);
  }

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

const massagesErrors = computed<string[]>(() =>
  Object.values(form.errors.value),
);
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
        class="grid grid-cols-[1fr_1fr_1fr_1fr_max-content] grid-rows-[auto_1fr] gap-[10px] w-[50%] relative"
      >
        <AccountValidateErrorTooltip
          v-if="massagesErrors.length"
          class="absolute left-[-30px] top-[6px]"
          :massages="massagesErrors"
        />
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
        <div v-show="form.values.recordType !== 'LDAP'">
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
