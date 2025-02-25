<script setup lang="ts">
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

const schema = getAccountSchema(props.account);

const form = useForm({
  validationSchema: toTypedSchema(schema),
});
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
        <AutoFormField
          v-if="form.values.recordType !== 'LDAP'"
          v-bind="fields.password"
        />
      </div>
    </template>
  </AutoForm>
</template>

<style scoped></style>
