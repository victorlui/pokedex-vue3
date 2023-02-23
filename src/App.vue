<template>
  <div id="app">
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  background: rgb(235,190,230);
  background: linear-gradient(90deg, rgba(235,190,230,1) 0%, rgba(215,211,233,1) 40%, rgba(205,221,224,1) 100%);
}

@media screen and (min-width: 300px) and (max-width: 700px) {
  .container {
   height: auto;
  }
}
</style>
