<script setup lang="ts">
import type { FieldProps } from './interface'
import { FormControl, FormField, FormItem } from '@shared/ui/shadcn/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/shadcn/select'
import { beautifyObjectName, maybeBooleanishToBoolean } from './utils'

defineProps<FieldProps & {
  options?: string[]
}>()
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
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
