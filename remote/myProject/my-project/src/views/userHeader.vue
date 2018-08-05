<template>
  <div id="userMain">
    <div class="userInfo">
      <h2 class="title">在线课堂管理系统</h2>
      <div class="name">{{userInfo.user_name}}
      <div class="quit" @click="quit">退出</div>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name:'login',
  data(){
    return {
    }
  },
  computed:{
    ...mapGetters({
      userInfo : 'getUserInfo',
    })
  },
  filters:{
    
  },
  methods:{
    quit: function(){
      this.$store.dispatch('loginOut');
      this.$router.push("./login");
    },
  },
  mounted(){
   
  },
  watch:{
    
  }
}
</script>

<style scoped>
#userMain{
  position: absolute;
  top: 0;
  width: 1000px;
  height: 80px;
  background: #fff;
}
.userInfo{
  margin: 0 auto;
  height: 80px;
  width: 1000px;
  background: #ccc;
}
.title{
  display: inline-block;
  font-size: 24px;
  color: #45586E;
  line-height: 80px;
}
.name{
  display: inline-block;
  float: right;
  margin-right: 20px;
  position: relative;
  font-size: 24px;
  color: #45586E;
  line-height: 80px;
  cursor: pointer;
}  
.quit{
  display: none;
  position: absolute;
  top: 60px;
  right: 0;
  height: 40px;
  line-height: 40px;
  width: 80px;
  text-align: center;
  background: #FAFAFA;
  color: #45586E;
  box-shadow: 1px 1px 5px 0px rgba(222,229,236,0.50);
}
.quit:hover{
  color: #fff;
  background: #0A7AFF;
}
.name:hover .quit{
  display: block;
}

</style>







