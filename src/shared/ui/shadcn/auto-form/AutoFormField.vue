<script setup lang="ts" generic="U extends ZodAny">
import { computed } from "vue";

import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from "./constant";
import useDependencies from "./dependencies";
import type { Config, ConfigItem, Shape } from "./interface";
import type { ZodAny } from "zod";

const props = defineProps<{
  fieldName?: string;
  shape?: Shape;
  config?: ConfigItem | Config<U>;
}>();

const shape = props.shape as Shape
const fieldName = props.fieldName as string

function isValidConfig(config: any): config is ConfigItem {
  return !!config?.component;
}

const delegatedProps = computed(() => {
  if (["ZodObject", "ZodArray"].includes(shape?.type))
    return { schema: props.shape?.schema };
  return undefined;
});

const { isDisabled, isHidden, isRequired, overrideOptions } = useDependencies(
  fieldName,
);
</script>

<template>
  <component
    class="grid auto-rows-max h-max gap-[5px]"
    :is="
      isValidConfig(config)
        ? typeof config.component === 'string'
          ? INPUT_COMPONENTS[config.component!]
          : config.component
        : INPUT_COMPONENTS[DEFAULT_ZOD_HANDLERS[shape.type]]
    "
    v-if="!isHidden"
    :field-name="fieldName as string"
    :label="shape.schema?.description"
    :required="isRequired || shape.required"
    :options="overrideOptions || shape.options"
    :disabled="isDisabled"
    :config="config"
    v-bind="delegatedProps"
  >
    <slot />
  </component>
</template>
