<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
} from "@shared/ui/shadcn/form";
import { Input } from "@shared/ui/shadcn/input";

import type { FieldProps } from "./interface";
import { computed, ref } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";

defineProps<FieldProps>();

const typePasswordIsShow = computed(() =>
  passwordIsShow.value ? "text" : "password",
);
const passwordIsShow = ref(false);
const toggleShowPassword = () => (passwordIsShow.value = !passwordIsShow.value);

</script>

<template>
  <FormField
    v-slot="slotProps"
    :name="fieldName"
  >
    <FormItem v-bind="$attrs">
      <FormControl>
        <div class="relative">
        <Input
          :type="typePasswordIsShow"
          v-bind="{ ...slotProps.componentField, ...config?.inputProps }"
          :disabled="disabled"
          :class="{
            'border-red-500': slotProps.errors.length,
            'pr-[40px]': true
          }"
          autocomplete="new-password"
        />
        <div
          @click.stop.prevent="toggleShowPassword"
          class="absolute right-[10px] top-[10px] cursor-pointer select-none"
        >
          <div v-if="slotProps.componentField.modelValue">
            <Eye
              class="h-[18px]"
              v-if="passwordIsShow"
            />
            <EyeOff
              class="h-[18px]"
              v-else
            />
          </div>
        </div>
        </div>
      </FormControl>
    </FormItem>
  </FormField>
</template>
