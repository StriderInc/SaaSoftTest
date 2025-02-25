<script setup lang="ts">
import type { FieldProps } from './interface'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@shared/ui/shadcn/form'
import { Label } from '@shared/ui/shadcn/label'
import { RadioGroup, RadioGroupItem } from '@shared/ui/shadcn/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/shadcn/select'
import AutoFormLabel from './AutoFormLabel.vue'
import { beautifyObjectName, maybeBooleanishToBoolean } from './utils'

defineProps<FieldProps & {
  options?: string[]
}>()
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <Select :disabled="maybeBooleanishToBoolean(config?.inputProps?.disabled) ?? disabled" v-bind="{ ...slotProps.componentField }">
            <SelectTrigger class="w-full" :class="{
            'border-red-500': slotProps.errors.length,
          }">
              <SelectValue :placeholder="config?.inputProps?.placeholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in options" :key="option" :value="option">
                {{ beautifyObjectName(option) }}
              </SelectItem>
            </SelectContent>
          </Select>
        </slot>
      </FormControl>
    </FormItem>
  </FormField>
</template>
