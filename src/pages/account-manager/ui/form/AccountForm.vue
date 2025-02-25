<script setup lang="ts">
import type { IAccount } from "@entities/account";
import { AutoForm, type Config } from "@shared/ui/shadcn/auto-form";

import { fieldConfig } from "../../config/fieldConfig";
import { getAccountSchema } from "../../config/schema";
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
    :schema="schema"
    :form="form"
    :field-config="fieldConfig as Config<z.infer<typeof schema>>"
  >
  </AutoForm>
  <div>
    {{ account.tag }}
  </div>
</template>

<style scoped></style>
