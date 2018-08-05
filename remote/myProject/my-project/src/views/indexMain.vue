<template>
    <div id="contentMain" class="contentMain" >
      <user-Header></user-Header>
      <div class="content">
        <left-Main></left-Main>
        <right-Main class="rightMain"></right-Main>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userHeader from './userHeader'
import leftMain from './leftMain'
import rightMain from './rightMain'
export default {
  name: 'App',
  components:{
    userHeader,
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
