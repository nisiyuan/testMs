<template>
  <div id="rightMain" class="rightMain">
      <select-Ques v-if="curModel ==0"></select-Ques>
      <ques-Manage v-if="curModel ==1"></ques-Manage>
      <test-Manage v-if="curModel ==2"></test-Manage>
      <my-Info v-if="curModel ==3"></my-Info>
      <teacher-Manage v-if="userInfo.level==1&&curModel ==4"></teacher-Manage>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import myInfo from '../components/rightMain/myInfo'
import quesManage from '../components/rightMain/quesManage'
import selectQues from '../components/rightMain/selectQues'
import teacherManage from '../components/rightMain/teacherManage'
import testManage from '../components/rightMain/testManage'

export default {
  data(){
    return {
		
    }
  },
  components:{
    myInfo,
    quesManage,
    selectQues,
    teacherManage,
    testManage
  },
  computed:{
    ...mapGetters({
      userInfo: 'getUserInfo',
      curModel: 'getCurModel',
	
    })
  },
  filters:{
    
  },
  methods:{
	
  },
  mounted(){
	  
  },
  watch:{
   
  },
}
</script>

<style scoped>



</style>







