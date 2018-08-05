<template>
  <div id="teacherManage" class="teacherManage">
     <h3>教师信息管理</h3>
      <div class="table">
        <table border="1" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <td>教师ID</td>
              <td>用户名</td>
              <td>级别</td>
              <td>权限</td>
              <td>年龄</td>
              <td>性别</td>
              <td>电话</td>
              <td>修改</td>
              <td>删除</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in allUserInfo" :key="item.user_id">
              <td>{{item.user_id}}</td>
              <td>{{item.user_name}}</td>
              <td>{{item.level}}</td>
              <td>{{item.access}}</td>
              <td>{{item.age}}</td>
              <td v-show="item.sex==1">男</td>
              <td v-show="item.sex==2">女</td>
              <td>{{item.phone}}</td>
              <td><a href="javascript:;" v-show="item.user_id!=userInfo.user_id" @click="edit(item)">修改</a></td>
              <td><a href="javascript:;" v-show="item.user_id!=userInfo.user_id" @click="delUser(item)">删除</a></td>
            </tr>
          </tbody>
        </table>
        <div class="add" @click="changeShowAddStates">添加老师</div>
      </div>
      
      <tip-Model class="tipModel" v-show="showDeleteTip" :tipInfo="{title:'提示',content:'确认要删除吗？',cancelBtn:'取消',confirmBtn:'删除'}" v-on:cancel="cancel" v-on:confirm="confirm"></tip-Model>
      <div class="addModel" v-show="showAddModel||showEditModel">
        <h3>{{modelMsg}}</h3>
        <div class="addEach" v-show="showEditModel">
          <label>用户Id:</label>
          <span style="margin-left:24px;">{{curUserInfo.user_id}}</span>
        </div>
        <div class="addEach">
          <label>用户名:</label>
          <input type="text" id="name" v-model="name">
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
          <label>是否管理员:</label>
          <label for="is">是</label>
          <input id="is" type="radio" v-model="isAdmin" value=1 name="admin"/>
          <label for="no">否</label>
          <input id="no" type="radio" v-model="isAdmin" value=0 name="admin"/>
        </div>
        <div class="addEach">
          <label>权限:</label>
          <input type="text" id="access" v-model="access">
        </div>
        <div class="addEach">
          <label>电话:</label>
          <input type="text" id="phone" v-model="phone">
        </div>
        <p class="wrongMsg" v-show="showWrongMsg">{{wroMsg}}</p>
        <div class="btns">
          <div class="btn cancelBtn" @click="clear">取消</div>
          <div class="btn confirmBtn" @click="addTeacher" v-show="showAddModel">添加</div>
          <div class="btn confirmBtn" @click="addTeacher" v-show="showEditModel">修改</div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tipModel from '../common/tipModel'

export default {
  data(){
    return {
      showDeleteTip:false,
      wroMsg:"",
      showWrongMsg:false,
      showAddModel:false,
      curUserInfo:{},
      showEditModel:false,
      sex:1,
      isAdmin:0,
      modelMsg:"",
      name:"",
      age:"",
      phone:"",
      access:"",
    }
  },
  computed:{
    ...mapGetters({
      userInfo : 'getUserInfo',
      allUserInfo:'getAllUserInfo',
      teacherErrMsg: 'getTeacherErrMsg',
    })
  },
  components:{
    tipModel,
  },
  filters:{
    
  },
  methods:{
    //删除用户
    delUser(data){
      this.showDeleteTip = true;
      this.curUserInfo = data;
    },
    //取消删除
    cancel(){
      this.showDeleteTip = false;
    },
    //确认删除
    confirm(){
      this.showDeleteTip = false;
      this.$store.dispatch('delUserInfo',{user_id:this.curUserInfo.user_id})
    },
    //修改用户信息
    edit(data){
      this.modelMsg = "修改用户信息";
      this.showEditModel = true;
      this.curUserInfo = data;
      this.name = this.curUserInfo.user_name;
      this.age = this.curUserInfo.age;
      this.phone = this.curUserInfo.phone;
      this.sex = this.curUserInfo.sex;
      this.admin = this.curUserInfo.level;
      this.access = this.curUserInfo.access;
    },
    //改变添加教师弹窗显示状态
    changeShowAddStates(data){
      if(data){
        this.modelMsg = "添加教师";
      }
      this.showAddModel = data;
    },
    // 添加教师
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
            name:this.name.trim(),
            age:this.age,
            phone:this.phone,
            sex:this.sex,
            admin:this.isAdmin,
            access:this.access,
          }
          if(this.showEditModel){//编辑
            addObj.user_id = this.curUserInfo.user_id;
            this.$store.dispatch('editUserInfo',addObj);
          }else{//添加
            this.$store.dispatch('addUserInfo',addObj);
          }
          setTimeout(() => {
            this.clear();
          },1000)
      }
    },
    //取消添加教师
    clear(){
      this.name = "";
      this.age = "";
      this.phone = "";
      this.access = "";
      this.sex = 1;
      this.isAdmin = 0;
      this.changeShowAddStates(false);
      this.showEditModel = false;
      this.curUserInfo = {};
    },
    tips(){
      this.wroMsg = this.teacherErrMsg;
      this.showWrongMsg = true;
      setTimeout(()=>{
        this.showWrongMsg = false;
      },2000)
    }
  },
  mounted(){
	  
  },
  watch:{
    'teacherErrMsg':'tips'
  },
}
</script>

<style scoped>
.teacherManage{
  position: relative;
  width: 100%;
  line-height: 40px;
  text-align: center;
  color: #555;
}
.table{
  margin: 40px auto;
  width: 600px;
}
table{
  width: 100%;
  border-color:#eee;
}
tr{
  height: 40px;
  line-height: 40px;
}
thead tr td{
  color: 000;
  font-weight: bold;
}
.tipModel{
  position: absolute;
  top: 0;
  height: 800px;
  width: 775px;
}
.add{
  display: block;
  margin-left: 0;;
  text-align: left;
  margin-top: 20px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #71B1F9;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.addModel{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  height:470px;
  width:360px;
  border-radius: 20px;
  background:#eee;
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
.addEach #name,.addEach #age, .addEach #phone,.addEach #access{
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
}
.cancelBtn{
  background: #E59817;
}
.confirmBtn{
  background: #75B118;
}
</style>







