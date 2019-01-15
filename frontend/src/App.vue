<template>
  <div id="app">
    <header>
      <span>Orange Wheel</span>
    </header>
    <main>
      <div class="wrapper">
        <div class="shops">
           <book v-for="list in lists" :key="list.imageUrl" :list="list"></book>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
  // import data from './db.json'
  import Shop from './components/Shop'

  export default {
    name: 'app',
    data () {
      return {
        lists: []
      }
    },
    // created () {
    //   this.lists = data
    // },
    components: {
      Shop
    }
  }
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
