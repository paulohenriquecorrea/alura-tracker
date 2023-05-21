<template>
  <div class="ajuste">
    <FormularioCadastro @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
      <BoxPadrao v-if="listaEstaVazia">
        Você não está muito produtivo(a) hoje!
      </BoxPadrao>
      <div class="field">
        <p class="control has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Digite para filtrar"
            v-model="filtro"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
      <TarefaRealizada
        v-for="(tarefa, index) in tarefas"
        :key="index"
        :tarefa="tarefa"
        @aoTarefaClicada="selecionarTarefa"
      />
      <ModalDefault :mostrar="tarefaSelecionada != null">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Editando a Tarefa</p>
          <button
            @click="fecharModal"
            class="delete"
            aria-label="close"
          ></button>
        </template>
        <template v-slot:corpo>
          <div class="field">
            <label for="descricaoDaTarefa" class="label"> Descrição </label>
            <input
              type="text"
              class="input"
              id="descricaoDaTarefa"
              v-model="tarefaSelecionada.descricao"
            />
          </div>
        </template>
        <template v-slot:rodape>
          <button @click="alterarTarefa" class="button is-success">
            Salvar Alterações
          </button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </template>
      </ModalDefault>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import BarraLateral from "../components/BarraLateral.vue";
import FormularioCadastro from "../components/FormularioCadastro.vue";
import TarefaRealizada from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import BoxPadrao from "../components/Box.vue";
import ModalDefault from "../components/ModalDefault.vue";
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
    ModalDefault,
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
    const filtro = ref("");

    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas.filter(
    //     (t) => !filtro.value || t.descricao.includes(filtro.value)
    //   )
    // );

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      filtro,
      store,
    };
  },
});
</script>

<style scoped>
.ajuste {
  padding: 20px;
}
</style>
