import type { EmitFn } from "vue";

export const deleteAccount = (
  deletedId: string,
  emmit: EmitFn<["saveAccount", "editAccount", "deleteAccount"]>,
) => {
  emmit("deleteAccount", deletedId);
};
