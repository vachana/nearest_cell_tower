<template>
  <div id="app">
    <div id="nav">
      <h1>
        <b><u>BUILDINGS</u></b>
      </h1>
      <br />
      <h2>Click on the building to find the nearest cell tower</h2>
      <br />
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
