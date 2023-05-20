<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criar tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa deseja iniciar"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorDefault @aoTemporizadorFinalizado="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import TemporizadorDefault from "./Temporizador.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "FormularioCadastro",
  emits: ["aoSalvarTarefa"],
  components: {
    TemporizadorDefault,
  },

  setup(props, { emit }) {
    const descricao = ref("");
    const idProjeto = ref("");

    const projetos = computed(() => store.state.projeto.projetos);

    const store = useStore(key);

    const salvarTarefa = (tempoEmSegundos: number): void => {
      emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoEmSegundos,
        descricao: descricao.value,
        projeto: projetos.value.find((proj) => proj.id == idProjeto.value),
      });
      descricao.value = "";
    };
    return {
      descricao,
      idProjeto,
      projetos,
      salvarTarefa,
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
