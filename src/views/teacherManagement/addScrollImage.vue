<template>
<div class="bank-import">
 <el-row>
  <el-col :span="10">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
         <el-form-item label="" prop="">
      <div>添加轮播图</div>
      <div class="xiaojei-mu">
        <div v-for="(item,index) of ScrollImageList" :key="index" class="xiaojei-li">
          <div class="">轮播图名称：{{item.name}}</div>
          <div>轮播图序号：{{item.sort}}</div>
          <div>轮播图资源URL：{{item.url}}</div>
        </div>
      </div>
      </el-form-item>   
  <el-form-item label="轮播图名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="顺序" prop="sort">
    <el-select v-model="ruleForm.sort" placeholder="请选择顺序">
      <el-option label="1" value="1"></el-option>
      <el-option label="2" value="2"></el-option>
      <el-option label="3" value="3"></el-option>
      <el-option label="4" value="4"></el-option>
      <el-option label="5" value="5"></el-option>
      <el-option label="6" value="6"></el-option>
    </el-select>
  </el-form-item>  
    <el-form-item label="上传轮播图" prop="">
<el-upload
  class="upload-demo"
  ref="upload"
  action=""
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :on-change="handleChange"
  :http-request="upLontPDF"
  :limit="limit"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <!-- <div slot="tip" class="el-upload__tip">只能上传PDF格式的文件，且不超过500kb</div> -->
</el-upload>    
</el-form-item>  
  <el-form-item>
    <el-button type="primary" @click="addcourse('ruleForm')">添加轮播图</el-button>
    <el-button @click="restxiao()">重置轮播图部分</el-button>
  </el-form-item>  
  <el-form-item>
    <el-button type="primary" @click="submitForm()">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>      
  </el-col>
  <!-- <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col> -->
</el-row>        
</div>
</template>

<script>
  import { addScrollImage,uploadFile } from '../../api/api';
  export default {
    data() {
      return {
        limit: 1,
        ruleForm: {
          name: '',
          sort: '',
        },
        ScrollImageList: [],
        imgUrl: '',
        file: null,
        file1: null,
        fileList: [],
        fileList1: [],
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '请选择顺序', trigger: 'change' }
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
            addcourse(formName){
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (that.imgUrl === "") {
                this.$message({
              message: "请先上传图片",
              type: 'error'
            });        
            return false                  
            } 
            if (that.ScrollImageList.length === 0) {
             that.ScrollImageList = [{
              name: String(that.ruleForm.name),
              sort: String(that.ruleForm.sort),
              url: String(that.imgUrl)
            }]               
            }else{
            that.ScrollImageList = [...that.ScrollImageList,{
              name: String(that.ruleForm.name),
              sort: String(that.ruleForm.sort),
              url: String(that.imgUrl)
            }]  
            }
            that.restxiao();
          }
          })
      },
      restxiao(){
        var that = this;
          this.$refs['ruleForm'].resetFields();
          that.file = null;
          that.fileList = [];
          that.imgUrl = '';
      },
      submitForm(formName) {
        var that = this;
            if (that.ScrollImageList.length === 0) {
                this.$message({
              message: "至少添加一组图片",
              type: 'error'
            });        
            return false                  
            } 
            addScrollImage({images:that.ScrollImageList}).then(data => {
                console.log(data)
                if (data.errCode === '200') {
                    // that.imgUrl = data.body.resultUrl;
                    this.$message({
                    message: '成功',
                    type: 'success'
                    });
                    that.resetForm('ruleForm');
                    that.file = null;
                    that.ileList = [];
                    that.imgUrl = '';
                } else {
                this.$message({
                message: data.errMsg,
                type: 'error'
                });            
                }
            })                       
      },
      upLontPDF(){

      },
      upLontPDF1(){

      },     
      handleChange(file) {
        this.file = file.raw;
        this.fileList = [this.file];
        this.imgUrl = '';
       },    
      resetForm(formName) {
        var that = this;
        this.$refs[formName].resetFields();
        that.file = null;
        that.ileList = [];
        that.imgUrl = '';
        that.restxiao();
        that.ScrollImageList = [];
      },
      submitUpload() {
          console.log(this.$refs.upload)
        // this.$refs.upload.submit();
 		let form = new FormData();
		// 后端接受参数 ，可以接受多个参数
		form.append("file",this.file)
		form.append(" "," ")       
        let that = this;
        uploadFile(form).then(data => {
            console.log(data)
            if (data.errCode === '200') {
                that.imgUrl = data.body.resultUrl;
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
        this.imgUrl = '';
      },
      handlePreview(file) {
        console.log(file);
      },           
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
