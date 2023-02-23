<template>
  <div ref="listEl" class="container">
    <div class="title">
      <h1>Pokedex</h1>
    </div>

    <div class="list">
      <div v-for="pokemon in pokemonsList" :key="pokemon.id" class="pokemon">
        <RouterLink :to="`/${pokemon.name}`">
          <div class="pokemonImage">
            <img
              :src="`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`"
            />
          </div>
          <div class="titleName">
            <p>{{ pokemon.name }}</p>
          </div>
        </RouterLink>
       
        
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {RouterLink} from 'vue-router';
import { onMounted } from "@vue/runtime-core";
import { useInfiniteScroll } from "@vueuse/core";
import api from "../services/api";

const pokemonsList: any = ref([]);
const limit = ref(20);
const listEl = ref(null);

const fetchPokemons = async () => {
  try {
    const response = await api.get(`/pokemon?limit=${limit.value}`);
    pokemonsList.value = response.data.results;
    console.log(response.data.results);
  } catch (error) {
    console.log("error", error);
  }
};

onMounted(fetchPokemons);

const getPokemonsOnScroll = async (l:number) => {
 
  limit.value += l;
  const limitA = (limit.value += l);
  try {
    const response = await api.get(`/pokemon?limit=20&offset=${limitA}`);
    const newArray = [...pokemonsList.value, ...response.data.results];
    pokemonsList.value = newArray;
  } catch (error) {
    console.log("error", error);
  } 
};

useInfiniteScroll(
  listEl,
  () => {
    getPokemonsOnScroll(10);
  },
  { distance: 20 }
);
</script>

<style scoped>
.container {
  overflow: auto;
  height: 100vh;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}
.container::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.title {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
}

.list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

@media screen and (min-width: 280px) and (max-width: 700px) {
  .list {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}

.pokemonImage {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin: 10px;
  width: 290px;
  height: 300px;
  cursor: pointer; 
}

.pokemon:hover {
  background: rgba(255, 255, 255, 0.50);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
}

.titleName {
  display: flex;
  align-items: center;
  justify-content: center;
  
}
p {
  font-size: 20px;
 }

 
</style>
