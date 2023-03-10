<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioCadastro @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <TarefaRealizada
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :tarefa="tarefa"
        />
        <BoxPadrao v-if="listaEstaVazia">
          Você não está muito produtiva hoje!
        </BoxPadrao>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import FormularioCadastro from "./components/FormularioCadastro.vue";
import TarefaRealizada from "./components/Tarefa.vue";
import ITarefa from "./interfaces/ITarefa.vue";
import BoxPadrao from "./components/Box.vue";

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    FormularioCadastro,
    TarefaRealizada,
    BoxPadrao,
  },

  data() {
    return {
      tarefas: [] as InstanceType<typeof ITarefa>[],
      modoEscuroAtivo: false,
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: InstanceType<typeof ITarefa>) {
      this.tarefas.push(tarefa);
    },
    trocarTema(modoEscuroAtivo: boolean): void {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>

<style scoped>
.lista {
  padding: 1rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
