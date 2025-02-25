<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
} from "@shared/ui/shadcn/form";
import { Input } from "@shared/ui/shadcn/input";

import type { FieldProps } from "./interface";

defineProps<FieldProps>();
</script>

<template>
  <FormField
    v-slot="slotProps"
    :name="fieldName"
  >
    <FormItem v-bind="$attrs">
      <FormControl>
        <Input
          type="text"
          v-bind="{ ...slotProps.componentField, ...config?.inputProps }"
          :disabled="disabled"
          :class="{
            'border-red-500': slotProps.errors.length,
          }"
          autocomplete="off"
        />
      </FormControl>
    </FormItem>
  </FormField>
</template>
