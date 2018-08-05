<template>
  <div id="confirmModel"> 
    <div class="comfirm-dialog">
      <h3 class="confirm-title">{{tipInfo.title}}</h3>
      <p class="confirm-content">{{tipInfo.content}}</p>
      <div class="confirm-btn-con">
        <a href="javascript:;" class="cancel-btn" @click="cancel">{{tipInfo.cancelBtn}}</a>
        <a href="javascript:;" class="confirm-btn" @click="confirm">{{tipInfo.confirmBtn}}</a>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'tipModel',//二次弹框公用组件
  data () {
    return {
      
    }
  },
  computed:{
    ...mapGetters({
     
    })
  },
  props: {
    tipInfo:{
      type:Object,
      required:true
    }
    //obj{title:"",content:"",confirmBtn:"",cancelBtn:"",type:""}
    //title: 弹框标题
    //content: 弹框主题
    //confirmBtn: 确认按钮显示文案 比如：交卷  确认 对应方法 --confirm
    //cancelBtn: 取消按钮显示文案 比如：取消  关闭 对应方法 --cancel
    //type: 窗口样式类型 确认--confirm  强制关闭--close
    //@wangying


  },
  methods:{
    confirm:function(){
      this.$emit('confirm');//父组件需定义function confirm(){}
    },
    cancel:function(){
      this.$emit('cancel');//父组件需定义function cancel(){}
    }
    
  },
  mounted(){
    
  }
}
</script>

<style scoped>
.comfirm-dialog{
  position: fixed;
  top: 50%;
  left: 50%;
  padding-top: 30px;
  transform: translate(-50%,-50%);
  height: 220px;
  width: 380px;
  border-radius: 20px;
  background:#eee;
}
.comfirm-dialog.confirm{
  margin-top: -120px;
  margin-left: -250px;
  height: 240px;
  width: 500px;
  background: #F4EACC;
}
.comfirm-dialog.close{
  margin-top: -127px;
  margin-left: -253px;
  height: 254px;
  width: 507px;
  /* background: url('../assets/confirm_close_bg.png') center; */
  background-size: cover;
}
.confirm-title{
  font-family: STYuanti-SC-Bold;
  font-size: 24px;
  color: #532911;
  line-height: 24px;
  margin-bottom: 24px;
  text-align: center;
}
.confirm-content{
  font-family: STYuanti-SC-Regular;
  font-size: 16px;
  color: #532911;
  text-align: center;
}
.confirm-btn-con{
  position: absolute;
  left: 0px;
  bottom: 30px;
  width: 100%;
  text-align: center;
}
.cancel-btn{
  display: inline-block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #E59817;
  border-radius: 20px;
  color: #fff;
  font-family: STYuanti-SC-Regular;
  font-size: 14px;
  text-align: center;
}
.confirm-btn{
  display: inline-block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #75B118;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  font-family: STYuanti-SC-Regular;
  font-size: 14px;
  margin-left: 20px;
}
.cancel-btn:hover{
  background-color: #FFBC4A;
}
.cancel-btn:active{
  background-color: #D2B481;
}
.confirm-btn:hover{
  background-color: #92CD38;
}
.confirm-btn:active{
  background-color: #829F56;
}
</style>


