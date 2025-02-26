<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shared/ui/shadcn/tooltip";
import { Ban } from "lucide-vue-next";

interface AccountValidateErrorTooltipProps {
  massages: string[];
}

defineProps<AccountValidateErrorTooltipProps>();
</script>

<template>
  <div>
    <TooltipProvider>
      <Tooltip :disable-closing-trigger="true">
        <TooltipTrigger class="cursor-pointer">
          <Ban color="red" />
        </TooltipTrigger>
        <TooltipContent
          :side-offset="10"
          class="bg-red-500 min-h-[36px]"
        >
          <p
            v-for="(massage, index) in massages"
            :key="index"
          >
            {{ massage }}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
