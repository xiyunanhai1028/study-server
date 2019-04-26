<template>
<div class="bank-import">
 <el-row>
  <el-col :span="10">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="活动名称" prop="courseName">
    <el-input v-model="ruleForm.courseName"></el-input>
  </el-form-item>
     <el-form-item label="活动时间" prop="activityTime">
        <el-date-picker
      v-model="ruleForm.activityTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item> 
   <el-form-item label="活动详情" prop="courseAddress">
    <el-input placeholder="" v-model="ruleForm.courseAddress"></el-input>
  </el-form-item> 
    <el-form-item label="人数" prop="totalNum">
    <el-input  v-model="ruleForm.totalNum" ></el-input>
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
  import { setActivity} from '../../api/api';
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
          courseName: '',
          courseAddress: '',
          totalNum: '',
          activityTime: ''
        },
        file: null,
        file1: null,
        fileList: [],
        fileList1: [],
        rules: {
          courseName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
        //  activityTime: [
        //     { required: true, message: '请选择时间', trigger: 'blur' },
        //   ],
          courseAddress: [
            { required: true, message: '请输入活动详情', trigger: 'blur' },
          ],
          totalNum: [
            { required: true, message: '请输入人数', trigger: 'blur' },
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
              if (that.ruleForm.activityTime === "") {
                this.$message({
                  message: '请选择时间',
                  type: 'success'
                });  
                return false;                
              }
         setActivity({
             id:'',
             orderNum: 0,
             activityName: String(that.ruleForm.courseName),
             activityComment: String(that.ruleForm.courseAddress),
             activityNum: Number(that.ruleForm.totalNum),
             activityTime: String(that.ruleForm.ctivityTime)
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
