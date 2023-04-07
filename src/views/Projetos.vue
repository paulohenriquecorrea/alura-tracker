<template>
  <div class="projetos">
    <h1 class="title">Projetos</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProjetoComponent",
});
</script>

<style>
.projetos {
  padding: 1.25rem;
}
span {
  margin-left: 5px;
}
</style>