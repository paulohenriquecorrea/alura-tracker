import ITarefa from '@/interfaces/ITarefa';
import { Estado } from '@/store';
import http from '@/http';
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  ALTERAR_TAREFA,
} from '@/store/tipo-acoes';
import {
  DEFINIR_TAREFAS,
  ADICIONA_TAREFA,
  ALTERA_TAREFA,
} from '@/store/tipo-mutacoes';
import { Module } from 'vuex';

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id == tarefa.id);
      state.tarefas[index] = tarefa;
    },
  },

  actions: {
    [OBTER_TAREFAS]({ commit }) {
      http
        .get('tarefas')
        .then((resposta) => commit(DEFINIR_TAREFAS, resposta.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.post('/tarefas', tarefa).then((resposta) => {
        commit(ADICIONA_TAREFA, resposta.data); // respoSta.data é o corpo da resposta que é disponibilizado pelo axios
      });
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERAR_TAREFA, tarefa));
    },
  },
};
