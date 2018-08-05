<template>
  <div class="login">
	  <div class="loginCon">
      <h2>好未来在线考试题库系统</h2>
      <div class="usernameCon">
        <span class="nameIcon"></span>
        <input type="text" class="username" placeholder="请输入用户名" ref="username">
      </div>
      <div class="passwordCon">
        <span class="passwordIcon"></span>
        <input type="password" class="password" placeholder="请输入密码" ref="password">
      </div>
      <div class="loginBtn" @click="click">登录</div>
      <p class="wrongMsg" v-show="showWrongMsg">{{wrongMsg}}</p>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      userName: '',
      passWord: '',
    }
  },
  computed:{
	  ...mapGetters({
      showWrongMsg: 'getShowWrongMsg',
      wrongMsg: 'getWrongMsg',
      isLogin: 'getIsLogin',
	  })
  },
  methods:{
	  test(data){
      var sendData ={
        'user_id':data
      }
		  this.$store.dispatch('getUserName',sendData)
    },
    click(){
      this.userName = this.$refs.username.value.trim();
      this.passWord = this.$refs.password.value.trim();
      if(this.userName == ''|| this.passWord == ''){
        this.$store.dispatch('changeSetWrongMsg',"用户名或密码不能为空");
        this.$store.dispatch('changeShowWrongMsg',true);
        return;
      }
      var sendData = {
        'user_name':this.userName,
        'password':this.passWord,
      }
      this.$store.dispatch('userLogin',sendData);
    },
    //错误信息展示3秒
    restState(){
      setTimeout(() => {
         this.$store.dispatch('changeShowWrongMsg',false);
      },3000)
    },
    //登录成功后跳转
    changePage(){
      if(this.isLogin){
        this.$router.push("/index");
      } 
    }
    
  },
  mounted(){
	 
  },
  watch:{
    'showWrongMsg':'restState',
    'isLogin':'changePage',
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.login{
  position: relative;
  height: 100%;
  width: 100%;
  /* background: url("../static/images/login/symbols-bg3.png") 0 0 no-repeat; */
}
.loginCon{
  position: absolute;
  height: 280px;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #FFFFFF;
  box-shadow: 0 2px 100px 0 #D7DBFF;
  border-radius: 20px;
  text-align: center;
}
.loginCon>h2{
  margin-top: 30px;
  width: 100%;
  text-align: center;
  font-size: 26px;
  color: #414141;
  line-height: 51.2px;
}
.usernameCon,.passwordCon{
  margin-top: 10px;;
  height: 40px;
  line-height: 40px;
  width: 100%;
  box-sizing: border-box;
}
.nameIcon{
  display: inline-block;
  margin-top: 6px;
  height: 28px;
  width: 28px;
  background: url('../../../static/images/login/user.png')0 0 no-repeat;
  background-size: 100%;
  vertical-align: middle;
}
.passwordIcon{
  display: inline-block;
  margin-top: 6px;
  height: 28px;
  width: 28px;
  background: url('../../../static/images/login/key.png')0 0 no-repeat;
  background-size: 100%;
  vertical-align: middle;
}
.username,.password{
  margin-left: 10px;;
  height: 39px;
  line-height: 39px;
  width: 260px;
  border:none;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  color: #333;
}
.loginBtn{
  display: inline-block;
  margin-top:25px;
  width: 100px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #333;
  font-size: 16px;
  background: #96F1FF;
  box-shadow: 0 5px 33px 0 #3495FF;
  border-radius: 100px;
  cursor: pointer;
}
.wrongMsg{
  margin-top: 10px;
  font-size: 12px;
  color: red;
}
</style>
