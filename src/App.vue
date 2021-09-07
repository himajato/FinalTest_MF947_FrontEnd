<template>
    <div style="display: flex">
      <Menu
      @toggleSideBar="toggleSideBar"
      :isToggle="isToggle"
      />
      <div>
        <Header
        @toggleSideBar="toggleSideBar"
        :isToggle="isToggle"
        />
        <TheContent
        :isToggle="isToggle"/>
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
    toggleSideBar(){
      this.isToggle = !this.isToggle
    }
  },

  data(){
    return{
      isToggle: false,
    }
  }
}
</script>

<style>
  @import './assets/css/Main.css';
  .header-and-content{
    position: relative;
    width: 100%;
    height: 100vh;
    right: 0px;
  }
</style>
