import AutoFormFieldEnum from "./AutoFormFieldEnum.vue";
import AutoFormFieldCustomInput from "./AutoFormFieldCustomInput.vue";
import AutoFormFieldPasswordInput from "./AutoFormFieldPasswordInput.vue";

export const INPUT_COMPONENTS = {
  customInput: AutoFormFieldCustomInput,
  password: AutoFormFieldPasswordInput,
  select: AutoFormFieldEnum,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS;
} = {
  ZodEnum: "select",
  ZodNativeEnum: "select",
};
