<template>
  <div class="modal" :class="{ 'is-active': mostrar }" v-if="mostrar">
    <!--O nome da propriedade (is-active) é a classe que será aplicada e o valor é a condição para que ela seja aplicada-->
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="cabecalho" />
      </header>
      <section class="modal-card-body">
        <slot name="corpo" />
      </section>
      <footer class="modal-card-foot">
        <slot name="rodape" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalDefault",
  props: {
    mostrar: {
      type: Boolean,
      required: true,
    },
  },
});
</script>