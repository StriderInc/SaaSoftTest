<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shared/ui/shadcn/tooltip";
import { CircleHelp } from "lucide-vue-next";
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger class="cursor-pointer">
        <CircleHelp />
      </TooltipTrigger>
      <TooltipContent class="bg-blue-300">
        <p>
          Для указания нескольких меток одной пары логин/пароль используйте
          разделитель ;
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
