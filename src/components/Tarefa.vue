<template>
  <BoxPadrao>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || "N/D" }}
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
  emits: ["aoTarefaClicada"],
  components: {
    CronometroDefault,
    BoxPadrao,
  },
  methods: {
    tarefaClicada(): void {
      this.$emit("aoTarefaClicada", this.tarefa); // O primeiro argumento é o nome do evento que será emitido, o segundo é o que será enviado como parâmetro
    },
  },
  props: {
    tarefa: {
      type: Object as PropType<typeof ITarefa>,
      required: true,
    },
  },
});
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>

