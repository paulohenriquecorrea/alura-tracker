<template>
  <FormularioCadastro @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaRealizada
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <BoxPadrao v-if="listaEstaVazia">
      Você não está muito produtivo(a) hoje!
    </BoxPadrao>
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <!--O nome da propriedade (is-active) é a classe que será aplicada e o valor é a condição para que ela seja aplicada-->
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando a Tarefa</p>
          <button
            @click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label"> Descrição </label>
            <input
              type="text"
              class="input"
              id="descricaoDaTarefa"
              v-model="tarefaSelecionada.descricao"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="alterarTarefa" class="button is-success">
            Salvar Alterações
          </button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import BarraLateral from "../components/BarraLateral.vue";
import FormularioCadastro from "../components/FormularioCadastro.vue";
import TarefaRealizada from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import BoxPadrao from "../components/Box.vue";
import { useStore } from "@/store";
import {
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  ALTERAR_TAREFA,
} from "@/store/tipo-acoes";

export default defineComponent({
  name: "App",
  components: {
    FormularioCadastro,
    TarefaRealizada,
    BoxPadrao,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
    };
  },
});
</script>
