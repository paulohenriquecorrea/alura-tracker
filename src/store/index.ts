import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { InjectionKey } from 'vue';
import { ALTERA_TAREFA, NOTIFICAR } from './tipo-mutacoes';
import { INotificacao } from '@/interfaces/INotificacao';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from './tipo-acoes';

import { DEFINIR_TAREFAS, ADICIONA_TAREFA } from '@/store/tipo-mutacoes';
import http from '@/http'; //@ é um atalho para o diretório src
import ITarefa from '@/interfaces/ITarefa';
import { EstadoProjeto, projeto } from './modulos/projeto';

export interface Estado {
  tarefas: ITarefa[];
  notificacoes: INotificacao[];
  projeto: EstadoProjeto;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: [],
    },
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
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 3000);
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

  modules: {
    projeto,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
