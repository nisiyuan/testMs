<template>
  <div id="testManage" class="testManage">
      <h3>教师信息管理</h3>
      <div class="table">
        <table border="1" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <td>测试ID</td>
              <td>测试名称</td>
              <td>教师</td>
              <td>科目</td>
              <td>预览</td>
              <td>删除</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in allTests" :key="item.user_id">
              <td>{{item.test_id}}</td>
              <td>{{item.test_name}}</td>
              <td>{{item.teacher_name}}</td>
              <td>{{item.subject}}</td>
              <td><a href="javascript:;" @click="show(item)">预览</a></td>
              <td><a href="javascript:;">删除</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="showTest" show="showEveryQues">
        <test-Item v-for="(item,index) in curTest.ques_list" :key="index" :quesInfo = "item" :index="index" ></test-Item>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import testItem from './testItem'

export default {
  data(){
    return {
      showEveryQues:false,
      curTest:{},
		
    }
  },
  components:{
    testItem
  },
  computed:{
    ...mapGetters({
       allTests:'getAllTests'
	
    })
  },
  filters:{
    
  },
  methods:{
    show(data){
      this.showEveryQues = true;
      this.curTest= data;
    }
	
  },
  mounted(){
	  
  },
  watch:{
   
  },
}
</script>

<style scoped>
.testManage{
  position: relative;
  width: 100%;
  line-height: 40px;
  text-align: center;
  color: #555;
}
.table{
  margin: 40px auto;
  width: 500px;
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
.showTest{
  position: absolute;
  top: 20px;
  margin: auto;
  width: 500px;
  min-height: 400px;
  background: #eee;
  overflow: hidden;
}
</style>







