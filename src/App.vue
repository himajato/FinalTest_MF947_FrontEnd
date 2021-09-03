<template>
    <div style="display: flex">
      <Menu/>
      <div>
        <Header/>
        <TheContent/>
      </div>
    </div>
</template>

<script>
import Header from './layout/Header.vue'
import Menu from './layout/Menu.vue'
import TheContent from './layout/TheContent.vue'

export default {
  name: 'App',
  components: {
    Header,
    Menu, 
    TheContent
  },

  methods: {
  }

}
</script>

<style>
  @import './assets/css/Main.css';
</style>
