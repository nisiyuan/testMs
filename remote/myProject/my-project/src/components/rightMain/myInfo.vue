<template>
  <div id="myInfo" class="myInfo">
      <h3>教师信息管理</h3>
      <div class="addModel">
        <div class="addEach">
          <label>我的Id:</label>
          <span style="margin-left:24px;">{{userInfo.user_id}}</span>
        </div>
        <div class="addEach">
          <label>用户名:</label>
          <input type="text" id="name" v-model="name">
        </div>
        <div class="addEach">
          <label>密码:</label>
          <input type="text" id="name" v-model="password">
        </div>
        <div class="addEach">
          <label>年龄:</label>
          <input type="text" id="age" v-model="age">
        </div>
        <div class="addEach">
          <label class="addSex">性别:</label>
          <label for="man">男</label>
          <input id="man" type="radio" v-model="sex" value=1 name="sex"/>
          <label for="woman">女</label>
          <input id="woman" type="radio" v-model="sex" value=2 name="sex"/>
        </div>
        <div class="addEach">
          <label>电话:</label>
          <input type="text" id="phone" v-model="phone">
        </div>
        <p class="wrongMsg" v-show="showWrongMsg">{{wroMsg}}</p>
        <div class="btns">
          <div class="btn cancelBtn" @click="clear">撤销</div>
          <div class="btn confirmBtn" @click="addTeacher">修改</div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      name:"",
      password:"",
      age:"",
      sex:"",
      phone:"",
      showWrongMsg:false,
      wroMsg:"",
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
  
   //撤销修改
    clear(){
      this.user_id = this.userInfo.user_id;
      this.name = this.userInfo.user_name;
      this.password = this.userInfo.password;
      this.age = this.userInfo.age;
      this.sex = this.userInfo.sex;
      this.phone = this.userInfo.phone;
    },
    //修改个人信息
    addTeacher(){
      var phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
      var ageReg = new RegExp("^(\\d|[1-9]\\d|100)$");
      if(this.name.trim() == ""){
        this.wroMsg = "请输入用户名！";
        this.showWrongMsg = true;
        setTimeout(()=>{
          this.showWrongMsg = false;
        },2000)
        return;
      }else if(!phoneReg.test(this.phone.trim())){
        this.wroMsg = "电话格式不正确！";
        this.showWrongMsg = true;
        setTimeout(()=>{
          this.showWrongMsg = false;
        },2000)
        return;
      }else if(!ageReg.test(this.age)){
        this.wroMsg = "请输入正确的年龄！";
        this.showWrongMsg = true;
        setTimeout(()=>{
          this.showWrongMsg = false;
        },2000)

      }else{
          var addObj = {
            user_id:this.user_id,
            password:this.password,
            name:this.name.trim(),
            age:this.age,
            phone:this.phone,
            sex:this.sex,
          }
          this.$store.dispatch('changeMyInfo',addObj);
      }

    }
  },
  mounted(){
	  this.clear();
  },
  watch:{
    'userInfo':'clear'

  },
}
</script>

<style scoped>
.myInfo{
  position: relative;
  width: 100%;
  line-height: 40px;
  text-align: center;
  color: #555;
}
.addModel{
  margin: 20px auto;
  height:420px;
  width:360px;
}
.addModel .addEach{
  margin-left: 20px;
  margin-top: 10px;
  width:210px;
  text-align: left;
}
.addEach input{
  line-height: 30px;
}
.addEach #name,.addEach #age, .addEach #phone{
  float: right;
}
.addSex{
  margin-right: 38px;
}
.wrongMsg{
  width: 100%;
  font-size: 14px;
  color:#ff0000;
}
.btn{
  display: inline-block;
  margin-top: 20px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.cancelBtn{
  background: #E59817;
}
.confirmBtn{
  background: #75B118;
}

</style>







