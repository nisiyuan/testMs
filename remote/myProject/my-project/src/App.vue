<template>
  <div id="app">
     <router-view/>
    <!-- <loginMain v-show="!isLogin"></loginMain> -->
    <!-- <div id="contentMain" class="contentMain" v-show="isLogin">
      <user-Header></user-Header>
      <div class="content">
        <left-Main></left-Main>
        <right-Main class="rightMain"></right-Main>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import loginMain from './components/login/login'
import userHeader from './views/userHeader'
import leftMain from './views/leftMain'
import rightMain from './views/rightMain'
export default {
  name: 'App',
  components:{
    userHeader,
    loginMain,
    leftMain,
    rightMain,
  },
  computed:{
	  ...mapGetters({
     
	  })
  },
}
</script>

<style>
#app {
  font-family:PingFangSC-Semibold, 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 80px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
html,body{
  height: 100%;
  width: 100%;
}
*{
  margin: 0;
  padding: 0;
}
ul,li{
  list-style: none;
}
.contentMain{
  margin:0 auto;
  width: 1000px;
  height: 100%;
}
.content{
  width: 100%;
  height: 100%;
}
.rightMain{
  float: right;
  height: 100%;
  margin-left: 25px;
  width: 775px;
}
</style>
