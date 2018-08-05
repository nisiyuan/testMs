<template>
  <div class="answerItem">{{quesInfo}}
    <div class="qid">{{index+1}}.}<span class="type">{{quesInfo.type|initype}}</span></div>
    <div class="title">{{quesInfo.content}}</div>
    <div class="xuanxiang" v-show="quesInfo.answerOptionList">
      <div v-for="item in quesInfo.answerOptionList" :key="item">{{item}}</div>
    </div>
    <div class="answer">答案:{{quesInfo.answer}}</div>
    <div class="analysis">解析:{{quesInfo.analysis||"暂无"}}</div>
    <hr class="fenge"/> 
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default{
    data () {
      return {
        ques:{}
      }
    },
    props:{
        quesInfo:{
            type:String,
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
     
  
    },
    methods: {
        initQues(){
            this.ques = JSON.parse(this.quesInfo)
        }
      
    },
    mounted(){
      this.initQues()
      
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
