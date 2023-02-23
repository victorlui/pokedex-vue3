<template>
  <div class="typesColor" >
    {{ name }}
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";
import Utils from '../../services/utils';

interface Props {
  name: string;
}
let props = withDefaults(defineProps<Props>(), { name: "" });

let name = ref<string>();
let color = ref("");

onMounted(() => {
  name.value = props?.name[0].toUpperCase() + props.name.substr(1);
  color.value = Utils.colorTypes(props.name)
});
</script>

<style scoped>
.types {
  padding: 5px;
  border-radius: 8px;
  color: #fff;
}
.typesColor {
  background: v-bind('color');
  padding: 5px;
  border-radius: 8px;
  color: #fff;
}

</style>

