<template>
<div class="bank-import">
 <el-row>
  <el-col :span="10">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="老师账号" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input placeholder="请输入密码" v-model="ruleForm.password" type="password"></el-input>
  </el-form-item> 
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>      
  </el-col>
  <!-- <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col> -->
</el-row>        
</div>
</template>

<script>
  import { addTeacherList } from '../../api/api';
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
        ruleForm: {
          name: '',
          password: '',
        },
        file: null,
        file1: null,
        fileList: [],
        fileList1: [],
        rules: {
          name: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    created(){
        console.log(sessionStorage.getItem('user'))
      //  if (sessionStorage.getItem('user')) {
      //    this.headers.token = JSON.parse(sessionStorage.getItem('user')).token;
      //    console.log(this.headers)
      //  }
    },
    methods: {
      submitForm(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          
          if (valid) {
         addTeacherList({
             userName: String(that.ruleForm.name),
             password: String(that.ruleForm.password)
         }).then(data => {
            console.log(data)
            if (data.errCode === '200') {
                this.$message({
                  message: '创建成功',
                  type: 'success'
                });
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
