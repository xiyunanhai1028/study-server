<template>
<div class="bank-import">
 <el-row>
  <el-col :span="10">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
               <el-form-item label="当前题数/总数" prop="">
    <!-- <el-input placeholder="请输入密码" v-model="ruleForm.password" ></el-input> -->
    <div>{{tushuNum}}/{{userData.totalNum}}</div>
  </el-form-item> 
          <el-form-item label="题目编号" prop="">
    <!-- <el-input placeholder="请输入密码" v-model="ruleForm.password" ></el-input> -->
    <div>{{bodyData.questionNo}}</div>
  </el-form-item> 
           <el-form-item label="答案" prop="">
    <!-- <el-input placeholder="请输入密码" v-model="ruleForm.password" ></el-input> -->
    <div>{{bodyData.questionNo}}</div>
  </el-form-item>  
  <el-form-item label="老师批改" prop="reply">
    <el-input v-model="ruleForm.reply"></el-input>
  </el-form-item>
   <!-- <el-form-item label="密码" prop="password">
    <el-input placeholder="请输入密码" v-model="ruleForm.password" ></el-input>
  </el-form-item>  -->
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">下一题</el-button>
    <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button> -->
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>      
  </el-col>
  <!-- <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col> -->
</el-row>        
</div>
</template>

<script>
  import { getPaperDetail,pushTeacherReply} from '../../api/api';
  export default {
    data() {
        /* 大小写字母*/
function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
              var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else if(!validateAlphabets(value)){
          callback(new Error('账号格式不正确，必须是英文字母组成的'));
        }else {
          callback();
        }
      };
      return {
        limit: 1,
        tushuNum: 1,
        ruleForm: {
          reply: ''
        },
        file: null,
        file1: null,
        fileList: [],
        fileList1: [],
        nextQuestion: 1,
        bodyData: {},
        rules: {
          reply: [
            { required: true, message: '请输入老师批改的内容', trigger: 'blur' },
          ]
        }
      };
    },
    created(){
        var that = this;
        this.userData = JSON.parse(this.$route.query.userData);
        console.log(this.userData)
      //  if (sessionStorage.getItem('user')) {
      //    this.headers.token = JSON.parse(sessionStorage.getItem('user')).token;
      //    console.log(this.headers)
      //  }
       that.getTi();
    },
    methods: {
      submitForm(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          
          if (valid) {
         pushTeacherReply({
             replyId: String(that.bodyData.replyId),
             paperId: String(that.userData.paperId),
             questionNo: that.tushuNum,
             replyType: 1,
             reply: String(that.ruleForm.reply)
         }).then(data => {
            console.log(data)
            if (data.errCode === '200') {
              that.tushuNum = that.tushuNum + 1;
              that.getTi();
                that.resetForm('ruleForm')
            } else {
               this.$message({
              message: data.errMsg,
              type: 'error'
            });            
            }
        })      
          } 
        });
      },     
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getTi(){
        var that = this;
              getPaperDetail({
        id: that.userData.paperId,
        nextQuestion: that.tushuNum,
        testType: 2
      }).then(data => {
            console.log(data)
            if (data.errCode === '200') {
                             that.bodyData = data.body;
               that.resetForm('ruleForm')
            } else {
               this.$message({
              message: data.errMsg,
              type: 'error'
            });            
            }
        }) 
      }
     
            
    }
  }
</script>
<style scoped>
.bank-import {
    /* width: */
    margin-top: 50px;
    padding-left: 200px;
}
</style>
