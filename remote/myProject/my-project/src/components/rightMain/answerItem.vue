<template>
  <div class="answerItem">
    <div class="qid">{{index+1}}.题目ID：{{quesInfo.ques_id}}<span class="type">{{quesInfo.type|initype}}</span><span class="type">{{quesInfo.grade|initGrade}}年级</span></div>
    
    <div class="title">{{quesInfo.content}}</div>
    <div class="xuanxiang" v-show="quesInfo.answerOptionList">
      <div v-for="item in quesInfo.answerOptionList" :key="item">{{item}}</div>
    </div>
    <div class="answer">答案:{{quesInfo.answer}}</div>
    <div class="analysis">解析:{{quesInfo.analysis||"暂无"}}</div>
    <a href="javascript:;" @click="edit">修改题目</a>
    <a href="javascript:;" @click="del">删除题目</a>
    <hr class="fenge"/> 
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    data () {
      return {
        
      }
    },
    props:{
        quesInfo:{
            type:Object,
            isRequired:true,
        },
        index:{
          type:Number,
          isRequired:true,
        }

    },
    computed:{
      ...mapGetters({
      })
    },
    filters:{
      initype:function(val){
        if(val ==1){
          return "填空题"
        }else{
          return "选择题"
        }
      },
      initGrade:function(val){
        switch(val){
          case "1":{
            return "一"
            break;
          }
          case "2":{
            return "二"
            break;
          }
          case "3":{
            return "三"
            break;
          }
          case "4":{
            return "四"
            break;
          }
          case "5":{
            return "五"
            break;
          }
          case "6":{
            return "六"
            break;
          }
          default:
            break;
        }
      }
  
    },
    methods: {
      edit(){
        this.$emit('editQues',this.quesInfo);
        this.$store.dispatch('curQues',this.quesInfo);
      },
      del(){
        this.$emit('changeTip')
        this.$store.dispatch('curQues',this.quesInfo);
      }
    },
    mounted(){
     
      
    },
    updated(){
     
    },
    watch: {
      
    }
  }
</script>

<style scoped>
.answerItem{
  margin-top: 15px;
  color: #555;
  font-size: 14px;
  line-height: 24px;
  width: 775px; 
}
.type{
  margin-left: 25px;
}
.fenge{
  margin-top: 10px;
  height: 0;
  width: 100%;
  border: none;
  border-bottom: 1px dashed #eee;
}
</style>
