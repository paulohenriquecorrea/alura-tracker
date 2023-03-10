<template>
  <BoxPadrao>
    <div class="columns">
      <div class="column is-7">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column">
        <CronometroDefault :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </BoxPadrao>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CronometroDefault from "./Cronometro.vue";
import ITarefa from "../interfaces/ITarefa.vue";
import BoxPadrao from "./Box.vue";

export default defineComponent({
  name: "TarefaRealizada",
  components: {
    CronometroDefault,
    BoxPadrao,
  },
  props: {
    tarefa: {
      type: Object as PropType<typeof ITarefa>,
      required: true,
    },
  },
});
</script>

