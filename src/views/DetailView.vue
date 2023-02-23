<template>
  <div class="container">
    <div v-if="loading">
      <p>carregando...</p>
    </div>
    <div v-if="!loading" class="content">
      <div class="row">
        <div class="imgPokemon">
          <img
            s
            :src="`https://img.pokemondb.net/sprites/home/normal/${router.params.name}.png`"
            :alt="`https://img.pokemondb.net/sprites/home/normal/${router.params.name}.png`"
          />
        </div>
        <div class="descriptions">
          <div>
            <p>
              Name:
              <strong>{{
                router.params.name[0].toUpperCase() +
                router.params.name.substr(1)
              }}</strong>
            </p>
          </div>
          <div>
            <p>
              Weight: <strong>{{ infos?.weight }}</strong>
            </p>
          </div>
          <div>
            <p>
              Height: <strong>{{ infos?.height }}</strong>
            </p>
          </div>
          <div class="listTypes">
            <p>Types:</p>

            <div v-for="(types, index) in infos?.types" :key="index">
              <PokemonTypes :name="types.type.name" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import api from "@/services/api";
import { useRoute } from "vue-router";
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import PokemonTypes from "@/components/pokemonsTypes/PokemonTypes.vue";


interface InfosPros {
  weight: number;
  height: number;
  types: {
    type: {
      name: any;
    };
  }[];
}

const router = useRoute();

const infos = ref<InfosPros>();
const loading = ref<boolean>(false);

const getInfoPokemon = async () => {
  loading.value = true;
  try {
    const res = await api.get(`/pokemon/${router.params.name}`);
    const resEvolution = await api.get(`/evolution-chain/${res.data.order}/`);
    console.log("res:", res.data);
    console.log("evolution:", resEvolution);
    infos.value = res.data;
  } catch (error) {
    console.log("error: " + error);
  } finally {
    loading.value = false;
  }
};

onMounted(getInfoPokemon);

components:{
  PokemonTypes
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 60%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.row {
  display: flex;
}

.imgPokemon {
  width: 320px;
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.descriptions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  flex: 1;
  padding: 20px;
  border-left: 1px solid #d3d3d3;
}

.listTypes {
  display: flex;
  align-items: center;
  gap: 10px;
}

</style>