<template>
  <FormularioCadastro @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaRealizada
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
    />
    <BoxPadrao v-if="listaEstaVazia">
      Você não está muito produtivo(a) hoje!
    </BoxPadrao>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "../components/BarraLateral.vue";
import FormularioCadastro from "../components/FormularioCadastro.vue";
import TarefaRealizada from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import BoxPadrao from "../components/Box.vue";

export default defineComponent({
  name: "App",
  components: {
    FormularioCadastro,
    TarefaRealizada,
    BoxPadrao,
  },

  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
});
</script>
