<template>
  <div id="quesManage" class="quesManage">
      <div class="title">
        <span class="name">学科:</span>
        <ul>
          <li v-for="item in subjects" :key="item" class="subject-item" :class="{selected:item == curSub}" @click="select(item)">{{item}}</li>
        </ul>
      </div>
      <div class="btn" @click="addQues(true)">增加题目</div>
      <div class="answerCon">
          <answer-Item v-for="(item,index) in allQues" :key="index" :quesInfo="item" :index="index" v-on:editQues="editQues" v-on:changeTip="showDelTip" :showDeleteTip="showDeleteTip"></answer-Item>
      </div>
      <div class="addQues" v-show="showAddQues">
        <h3>增加题目</h3>
        <div class="addEach">
          <label class="addSex">类型:</label>
          
          <label for="kong">填空题</label>
          <input type="radio" v-model="type" value=1 name="type"/>
          <label for="sel">选择题</label>
          <input type="radio" v-model="type" value=2 name="type"/>
        </div>
        <div class="addEach">
          <label class="subject">科目:</label>
          <label for="cn">语文</label>
          <input type="radio" v-model="subject" value="语文" name="subject"/>
          <label for="en">英语</label>
          <input type="radio" v-model="subject" value="英语" name="subject"/>
          <label for="shu">数学</label>
          <input type="radio" v-model="subject" value="数学" name="subject"/>
        </div>
        <div class="addEach">
          <label for="addTitle">题目:</label>
          <input type="text" id="addTitle" v-model="addTitle" class="text">
        </div>
        <div class="addEach" v-show="type == 2">
          <label for="options">选项:</label>
          <div class="optionCon"><span>A.</span><input type="text" class="options text" v-model="options1"></div>
          <div class="optionCon option2"><span>B.</span><input type="text" class="options text" v-model="options2"></div>
          <div class="optionCon option2"><span>C.</span><input type="text" class="options text" v-model="options3"></div>
          <div class="optionCon option2"><span>D.</span><input type="text" class="options text" v-model="options4"></div>
        </div>
        <div class="addEach">
          <label for="addAnswer">答案:</label>
          <input type="text" id="addAnswer" v-model="addAnswer" class="text">
        </div>
        <div class="addEach">
          <label for="analysis">解析:</label>
          <input type="text" id="analysis" v-model="analysis" class="text">
        </div>
       
        <div class="addEach">
          <label for="grade">年级</label>
          <select name="grade" id="grade" v-model="grade">
            <option value="1">一年级</option>
            <option value="2">二年级</option>
            <option value="3">三年级</option>
            <option value="4">四年级</option>
            <option value="5">五年级</option>
            <option value="6">六年级</option>
          </select>
        </div>
        <p class="wrongMsg" v-show="showWrongMsg">{{wroMsg}}</p>
        <div class="btns">
          <div class="btn cancelBtn" @click="clear">取消</div>
          <div class="btn confirmBtn" @click="addQueses" v-show="!showEditModel">添加</div>
          <div class="btn confirmBtn" @click="addQueses" v-show="showEditModel">修改</div>
        </div>
      </div>
      <tip-Model class="tipModel" v-show="showDeleteTip" :tipInfo="{title:'提示',content:'确认要删除该题目吗？',cancelBtn:'取消',confirmBtn:'删除'}" v-on:cancel="cancel" v-on:confirm="confirm"></tip-Model>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import answerItem from './answerItem'
import tipModel from '../common/tipModel'

export default {
  data(){
    return {
     showDeleteTip:false,
     showEditModel:false,
     showAddQues:false,
     showOptions: false,
     showWrongMsg: false,
     wroMsg:"",
     type:1,
     subject:"语文",
     addTitle:"",
     addAnswer:"",
     analysis:"",
     grade:"1",
     options1:"",
     options2:"",
     options3:"",
     options4:"",
    }
  },
  components:{
    answerItem,
    tipModel,
  },
  computed:{
    ...mapGetters({
      subjects:'getSubjects',
      curSub:'getCurSub',
      allQues: 'getAllQues',
      curQues: 'getCurQues'
    })
  },
  filters:{
    
  },
  methods:{
    //选中学科
    select(data){
      this.$store.dispatch('selectSub',data);
      this.$store.dispatch('selQues',{'subject':data});
    },
    addQues(data){
      this.showAddQues = data;
    },
    clear(){
      this.showAddQues = false;
      this.showOptions = false;
      this.showWrongMsg = false;
      this.showEditModel = false;
      this.wroMsg = "";
      this.type = 1;
      this.subject = "语文";
      this.addTitle = "";
      this.addAnswer = "";
      this.analysis = "";
      this.grade = "1";
      this.options1 = "";
      this.options2 = "";
      this.options3 = "";
      this.options4 = "";
    },
    //增加题目
    addQueses(){
        if(this.addTitle.trim() == ""){
          this.wroMsg = "请输入题目！";
          this.showWrongMsg = true;
            setTimeout(()=>{
              this.showWrongMsg = false;
            },2000)
            return;
        }else if(this.addAnswer.trim() == ""){
          this.wroMsg = "请输入答案！";
          this.showWrongMsg = true;
            setTimeout(()=>{
              this.showWrongMsg = false;
            },2000)
            return;
        }else if((this.type == 2) &&(this.options1.trim()==""||this.options2.trim()==""||this.options3.trim()==""||this.options4.trim()=="")){
          this.wroMsg = "请输入完整的选项！";
          this.showWrongMsg = true;
            setTimeout(()=>{
              this.showWrongMsg = false;
            },2000)
            return;
        }
        
        if(this.type ==1){
          var answerOptionList = "";
        }else{
          var answerOptionList = "A. "+this.options1+";"+"B. "+this.options2+";"+"C. "+this.options3+";"+"D. "+this.options4;
        }
        var addObj = {
          type:this.type,
          subject:this.subject,
          content:this.addTitle.trim(),
          answer:this.addAnswer.trim(),
          analysis:this.analysis.trim(),
          grade:this.grade,
          answerOptionList:answerOptionList,
          curSub:this.curSub,
          ques_id:this.curQues.ques_id,
        }
        if(this.showEditModel){
          this.$store.dispatch('editQues',addObj);
        }else{
          this.$store.dispatch('addQues',addObj);
        }
        this.clear();
    },
    //修改题目
    editQues(data){
      this.showEditModel = true;
      this.showAddQues = true;
      if(data.type == 2){
        this.showOptions = true;
      }
      this.type = data.type;
      this.subject = data.subject;
      this.addTitle = data.content;
      this.addAnswer = data.answer;
      this.analysis = data.analysis;
      this.grade = data.grade;
      this.options1 = data.answerOptionList[0];
      this.options2 = data.answerOptionList[1];
      this.options3 = data.answerOptionList[2];
      this.options4 = data.answerOptionList[3];
    },
    //展示删除确认框
    showDelTip(){
      this.showDeleteTip = true;
    },
    //取消删除
    cancel(){
      this.showDeleteTip = false;
    },
    //确认删除
    confirm(){
      this.$store.dispatch('delQues',{
        ques_id:this.curQues.ques_id,
        subject:this.curQues.subject,
      })
      setTimeout(() => {
        this.showDeleteTip = false;
      },1000)
      
    }
	
  },
  mounted(){
	  
  },
  watch:{
   
  },
}
</script>

<style scoped>
.title{
  margin-top: 50px;
  overflow: hidden;
}
.name{
  display: block;
  float: left;
  margin-right: 20px;
  margin-bottom: 14px;
  width: 70px;
  line-height: 26px;
  color: #8B97A5;
}
.subject-item{
  float: left;
  margin-right: 20px;
  margin-bottom: 14px;
  padding: 0 5px;
  color: #41556B;
  letter-spacing: 0px;
  line-height: 24px;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
}
.selected{
  background: #71B1F9;
  border-color:  #71B1F9;
  color: #fff;
}
.answerCon{
  margin-top: 20px;
}
.btn{
  margin-top: 20px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  background: #75B118;
  cursor: pointer;
}
.addQues{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%,-50%);
    height:500px;
    width:600px;
    border-radius: 20px;
    background:#eee;
    color: #555;
    font-size: 14px;
}

.addEach{
  margin-left: 20px;
  margin-top: 10px;
  width: 520px;
  text-align: left;
}
.addQues>h3{
  width: 100%;
  text-align: center;
  font-size: 16px;
}
.addEach label{
  margin-right: 15px;
}
.addEach input{
  line-height: 30px;
}
.addEach .text{
  width: 400px;
}
.optionCon{
  display: inline-block;
  margin-top: 10px;
}
.option2{
   margin-left: 50px;
}
.wrongMsg{
  width: 100%;
  font-size: 14px;
  text-align: center;
  color:#ff0000;
}
.btns{
  text-align: center;
}
.btns .btn{
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







