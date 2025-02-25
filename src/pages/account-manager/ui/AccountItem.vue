<script setup lang="ts">
import { watch } from "vue";

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
const emmit = defineEmits(["saveAccount", "editAccount"]);

const schema = getAccountSchema(props.account);

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

watch(
  () => form.meta.value.touched,
  () => form.validate(),
);
watch(
  () => form.values,
  async () => {
    const { valid } = await form.validate();
    if (!valid) return;

    if (form.values.recordType === "LDAP") {
      form.values.password = null;
    } else if (!form.values.password) {
      return form.setFieldError("password", "err");
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
  },
  {
    deep: true,
  },
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
      <div class="grid grid-cols-4 grid-rows-[auto_1fr] gap-[10px] w-[50%]">
        <AutoFormField v-bind="fields.tag" />
        <AutoFormField v-bind="fields.recordType" />
        <AutoFormField
          v-bind="fields.login"
          :class="{
            'col-span-2': form.values.recordType === 'LDAP',
          }"
        />
        <div v-if="form.values.recordType !== 'LDAP'">
          <AutoFormField v-bind="fields.password" />
        </div>
      </div>
    </template>
  </AutoForm>
</template>

<style scoped></style>
