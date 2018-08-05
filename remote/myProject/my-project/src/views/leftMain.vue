<template>
  <div id="leftMain" class="leftMain">
    <div v-for="(item,index) in list" :key="index" class="itemLink" :class="{'router-link-active':active==index}" @click="changeActiveState(item,index)">{{item}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
		list:['选题','题目管理','试卷管理','个人信息','教师管理'],
		active:0,
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
	  changeActiveState(item,index){
			this.active=index;
			this.$store.dispatch('changeCurModel',index);
			switch(item){
				case '选题':{
					break;
				}
				case '题目管理':{
					this.$store.dispatch('getAllSubject',{'user_name':this.userInfo.user_name});
					break;
				}
				case '试卷管理':{
					this.$store.dispatch('getAllTests');
					break;
				}
				case '个人信息':{
					break;
				}
				case '教师管理':{
					this.$store.dispatch('getAllUser');
					break;
				}
				default:{
					break;
				}
			}
	  },
	  levelChanged(){
			this.$store.dispatch('changeCurModel',0);//默认选择第一个模块
			if(this.userInfo.level !=1){
					this.list=['选题','题目管理','试卷管理','个人信息'];
				}else{
					this.list =['选题','题目管理','试卷管理','个人信息','教师管理'];
			}

	  }
  },
  mounted(){
	  this.levelChanged();
  },
  watch:{
    
  },
}
</script>

<style scoped>
.leftMain{
   float: left;
   height: 800px;
   width: 200px;
   background: #FAFAFA;
   border: 1px solid #EEF1F4;
   box-shadow: 1px 1px 5px 0px rgba(222,229,236,0.50);
   box-sizing: border-box;
}
.gameConfig{
  display: block;
}
.item-title{
	position: relative;
	height: 52px;
	line-height: 52px;
	cursor: pointer;
}
.icon-flag{
	position: absolute;
	display: inline-block;
	margin-left: 25px;
    margin-top: 20px;
}
.close{
	height: 0;
	width: 0;
	border-top: 5px solid transparent;
    border-left: 8px solid #8B97A5;
    border-bottom: 5px solid transparent;
}
.open{
	height: 0;
	width: 0;
	border-left: 5px solid transparent;
    border-top: 8px solid #8B97A5;
    border-right: 5px solid transparent;
}
.title{
	display: inline-block;
	position: absolute;
	left: 45px;
	font-size: 18px;
	height: 52px;
	line-height: 52px;
	color: #45586E;
}
.itemLink{
	display: inline-block;
	padding-left: 44px;
	width: 153px;
	height: 38px;
	line-height: 38px;
	color: #8B97A5;
	border-left: 3px solid #fafafa;
	text-decoration: none;
	cursor: pointer;
}
.itemLink.router-link-active{
	border-left-color: #71B1F9;
	background: #EFF3F5;
}


</style>







