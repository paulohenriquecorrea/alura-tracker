<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CronometroDefault v-bind:tempoEmSegundos="tempoEmSegundos" />
    <ButtonDefault
      @clicado="iniciar"
      icone="fas fa-play"
      texto="play"
      :desabilitado="cronometroRodando"
    />
    <ButtonDefault
      @clicado="finalizar"
      icone="fas fa-stop"
      texto="stop"
      :desabilitado="!cronometroRodando"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CronometroDefault from "./Cronometro.vue";
import ButtonDefault from "./Botao.vue";

export default defineComponent({
  name: "TemporizadorDefault",
  emits: ["aoTemporizadorFinalizado"],
  components: {
    CronometroDefault,
    ButtonDefault,
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },

  methods: {
    iniciar() {
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
});
</script>

<style scoped></style>
