<template>
<div class="bank-import">
 <el-row>
  <el-col :span="10">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="作业名称" prop="paperName">
    <el-input v-model="ruleForm.paperName"></el-input>
  </el-form-item>
  <el-form-item label="作业类型" prop="paperType">
    <el-select v-model="ruleForm.paperType" placeholder="">
      <el-option label="公务员" value="1"></el-option>
      <el-option label="事业单位" value="2"></el-option>
      <el-option label="银行考试" value="3"></el-option>
      <el-option label="政法干警考试" value="4"></el-option>
      <el-option label="教师资格证" value="5"></el-option>
      <el-option label="教师招聘" value="6"></el-option>
      <el-option label="选调研究生" value="7"></el-option>
      <el-option label="公务员（省考" value="8"></el-option>
    </el-select>
  </el-form-item>  
    <el-form-item label="题型" prop="questionType">
    <el-select v-model="ruleForm.questionType" placeholder="">
      <el-option label="选择题" value="1"></el-option>
      <el-option label="问答题" value="2"></el-option>
    </el-select>
  </el-form-item>  
      <el-form-item label="题库类型" prop="publishId">
    <el-select v-model="ruleForm.publishId" placeholder="">
      <el-option label="历史真题" value="1"></el-option>
      <el-option label="作业" value="2"></el-option>
    </el-select>
  </el-form-item>  
    <el-form-item label="作业文件上传" prop="name">
<el-upload
  class="upload-demo"
  ref="upload"
  action=""
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :on-change="handleChange"
  :limit="limit"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
  <div slot="tip" class="el-upload__tip">只能上传PDF格式的文件，且不超过500kb</div>
</el-upload>    
</el-form-item>  
    <el-form-item label="作业文件答案上传" prop="name">
<el-upload
  class="upload-demo"
  ref="upload"
  action=""
  :on-preview="handlePreview1"
  :on-remove="handleRemove1"
  :file-list="fileList1"
  :on-change="handleChange1"
  :limit="limit"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload1">上传到服务器</el-button> -->
  <div slot="tip" class="el-upload__tip">只能上传PDF格式的文件，且不超过500kb</div>
</el-upload>    
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
  import { parseSinglePaper } from '../../api/api';
  export default {
    data() {
      return {
        limit: 1,
        ruleForm: {
          paperName: '',
          paperType: '',
          questionType:'',
          publishId: ''
        },
        file: null,
        file1: null,
        fileList: [],
        fileList1: [],
        rules: {
          paperName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          paperType: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          questionType: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          publishId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],                      
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
            if (that.file === null) {
                this.$message({
              message: "请先上传题",
              type: 'error'
            });                  
            }
            if (that.file === null) {
                this.$message({
              message: "请先上答案",
              type: 'error'
            });                  
            }    
             		let form = new FormData();
		// 后端接受参数 ，可以接受多个参数
		form.append("file",this.file)
    form.append("paperName",that.ruleForm.paperName)   
    form.append("file1",this.file1)
    form.append("paperType",that.ruleForm.paperType)   
        form.append("publishId",that.ruleForm.publishId)   
        		form.append("questionType",that.ruleForm.questionType)   
            parseSinglePaper(form).then(data => {
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
          } else {
          }
        });
      },   
      handleChange(file) {
        this.file = file.raw;
        console.log(file)
        this.fileList = [this.file];
       },
      handleChange1(file) {
        this.file1 = file.raw;
        console.log(file)
        this.fileList1 = [this.file1];
       },       
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitUpload() {
          console.log(this.$refs.upload)
        // this.$refs.upload.submit();
 		let form = new FormData();
		// 后端接受参数 ，可以接受多个参数
		form.append("file",this.file)
		form.append(" "," ")       
        let that = this;
        parseSinglePaper(form).then(data => {
            console.log(data)
            if (data.errCode === '200') {
                this.$message({
                  message: '上传成功',
                  type: 'success'
                });
            } else {
               this.$message({
              message: data.errMsg,
              type: 'error'
            });            
            }
        })
      },
      submitUpload1() {
          console.log(this.$refs.upload)
        // this.$refs.upload.submit();
 		let form = new FormData();
		// 后端接受参数 ，可以接受多个参数
		form.append("file",this.file)
		form.append(" "," ")       
        let that = this;
        parseSinglePaper(form).then(data => {
            console.log(data)
            if (data.errCode === '200') {
                this.$message({
                  message: '上传成功',
                  type: 'success'
                });
            } else {
               this.$message({
              message: data.errMsg,
              type: 'error'
            });            
            }
        })
      },      
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleRemove1(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview1(file) {
        console.log(file);
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
