<template>
<div class="bank-import">
 <el-row>
  <el-col :span="10">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="课程名称" prop="courseName">
    <el-input v-model="ruleForm.courseName"></el-input>
  </el-form-item>
  <el-form-item label="课程时长" prop="courseTime">
    <el-input v-model="ruleForm.courseTime"></el-input>
  </el-form-item>
   <el-form-item label="课程标签" prop="courseTag">
    <el-input v-model="ruleForm.courseTag"></el-input>
  </el-form-item>
  <el-form-item label="课程价格" prop="coursePriceYear">
    <el-input v-model="ruleForm.coursePriceYear"></el-input>
  </el-form-item>
    <el-form-item label="课程须知" prop="courseNote">
    <el-input v-model="ruleForm.courseNote"></el-input>
  </el-form-item>       
    <el-form-item label="课程详情" prop="courseDetail">
    <el-input v-model="ruleForm.courseDetail"></el-input>
  </el-form-item>      
  <el-form-item label="课程种类" prop="courseKind">
    <el-select v-model="ruleForm.courseKind" placeholder="请选择种类">
      <el-option label="公务员" value="1"></el-option>
      <el-option label="事业单位" value="2"></el-option>
      <el-option label="银行考试" value="3"></el-option>
      <el-option label="政法干警考试" value="4"></el-option>
      <el-option label="教师资格证" value="5"></el-option>
      <el-option label="教师招聘" value="6"></el-option>
      <el-option label="选调研究生" value="7"></el-option>
      <el-option label="公务员(省考)" value="8"></el-option>      
    </el-select>
  </el-form-item>  
  <el-form-item label="课程级别" prop="courseLevel">
    <el-select v-model="ruleForm.courseLevel" placeholder="请选择课程级别">
      <el-option label="初级" value="1"></el-option>
      <el-option label="中级" value="2"></el-option>
      <el-option label="高级" value="3"></el-option>
    </el-select>
  </el-form-item>  
  <el-form-item label="课程类型" prop="courseType">
    <el-select v-model="ruleForm.courseType" placeholder="请选择课程类型">
      <el-option label="免费课" value="1"></el-option>
      <el-option label="微课堂" value="2"></el-option>
      <el-option label="VIP专区" value="3"></el-option>
    </el-select>
  </el-form-item>        
    <el-form-item label="课程首页图" prop="">
<el-upload
  class="upload-demo"
  ref="upload"
  action=""
  :on-remove="handleRemove"
  :file-list="fileList"
  :on-change="handleChange"
  :limit="limit"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <!-- <div slot="tip" class="el-upload__tip">只能上传PDF格式的文件，且不超过500kb</div> -->
</el-upload>    
</el-form-item>  
    <el-form-item label="课程资源" prop="">
<el-upload
  class="upload-demo"
  ref="upload1"
  action=""
  :on-remove="handleRemove1"
  :file-list="fileList1"
  :on-change="handleChange1"
  :limit="limit"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload1">上传到服务器</el-button>
  <!-- <div slot="tip" class="el-upload__tip">只能上传PDF格式的文件，且不超过500kb</div> -->
</el-upload>    
</el-form-item> 
    <el-form-item label="" prop="">
      <div>添加课程小节</div>
      <div class="xiaojei-mu">
        <div v-for="(item,index) of courseCategory" :key="index" class="xiaojei-li">
          <div class="">小节名称：{{item.name}}</div>
          <div>小节详情：{{item.detail}}</div>
          <div>小节课程资源URL：{{item.url}}</div>
        </div>
      </div>
      </el-form-item>   
  <el-form-item label="小节名称" prop="xiaojieName">
    <el-input v-model="xiaojieName"></el-input>
  </el-form-item>
  <el-form-item label="小节详情" prop="xiaojieDetail">
    <el-input v-model="xiaojieDetail"></el-input>
  </el-form-item>
      <el-form-item label="小节课程资源" prop="">
<el-upload
  class="upload-demo"
  ref="upload2"
  action=""
  :on-remove="handleRemove2"
  :file-list="fileList2"
  :on-change="handleChange2"
  :limit="limit"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload2">上传到服务器</el-button>
  <!-- <div slot="tip" class="el-upload__tip">只能上传PDF格式的文件，且不超过500kb</div> -->
</el-upload>    
</el-form-item>    
  <el-form-item>
    <el-button type="primary" @click="addcourse()">添加小节</el-button>
    <el-button @click="restxiao()">重置小节部分</el-button>
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
  import { addScrollImage,uploadFile ,createCourse} from '../../api/api';
  export default {
    data() {
      return {
        limit: 1,
        ruleForm: {
          courseName: '',
          courseDetail: '',
          courseNote: '',
          courseKind: '',
          courseLevel: '',
          courseType: '',
          coursePriceYear: '',
          courseTag: '',
          courseTime: ''
        },
        userData: [],
        imgUrl: '',
        imgUrl1: '',
        imgUrl2: '',
        file: null,
        file1: null,
        file2: null,
        fileList: [],
        fileList1: [],
        fileList2: [],
        courseCategory: [],
        xiaojieName: '',
        xiaojieDetail: '',
        rules: {
          courseName: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          courseDetail: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          courseNote: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          coursePriceYear: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          courseTag: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          courseTime: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],                                                           
          courseKind: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          courseLevel: [
            { required: true, message: '请选择顺序', trigger: 'change' }
          ],
          courseType: [
            { required: true, message: '请选择顺序', trigger: 'change' }
          ]
        }
      };
    },
    created(){
      this.userData = JSON.parse(this.$route.query.userData);
        // console.log(this.$route.query.userData)
      //  if (sessionStorage.getItem('user')) {
      //    this.headers.token = JSON.parse(sessionStorage.getItem('user')).token;
      //    console.log(this.headers)
      //  }
    },
    methods: {
      addcourse(){
        var that = this;
              if (that.xiaojieName === "") {
                this.$message({
              message: "请先输入小节名字",
              type: 'error'
            });        
            return false                  
            } 
               if (that.xiaojieDetail === "") {
                this.$message({
              message: "请先输入小节详情",
              type: 'error'
            });        
            return false                  
            }            
             if (that.imgUrl2 === "") {
                this.$message({
              message: "请先上传小节资源",
              type: 'error'
            });        
            return false                  
            }   
            console.log(this.courseCategory)
            if (this.courseCategory.length === 0) {
             this.courseCategory = [{
              name: String(that.xiaojieName),
              detail: String(that.xiaojieDetail),
              url: String(that.imgUrl2)
            }]               
            }else{
            this.courseCategory = [...this.courseCategory,{
              name: String(that.xiaojieName),
              detail: String(that.xiaojieDetail),
              url: String(that.imgUrl2)
            }]  
            }
            console.log(this.courseCategory)
      },
      submitForm(formName) {
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
             if (that.imgUrl1 === "") {
                this.$message({
              message: "请先上传图片",
              type: 'error'
            });        
            return false                  
            }            
             console.log("ddddddddd")
            createCourse({
              teacherId: Number(that.userData.teacherId),
              // id: '',
              coursePriceMonth: 12,
              courseName: String(that.ruleForm.courseName),
              courseDetail: String(that.ruleForm.courseDetail),
              courseNote: String(that.ruleForm.courseNote),
              courseTime: String(that.ruleForm.courseTime),
              courseTag: String(that.ruleForm.courseTag),
              courseType: Number(that.ruleForm.courseType),
              coursePriceYear: Number(that.ruleForm.coursePriceYear),
              courseLevel: Number(that.ruleForm.courseLevel),
              courseKind: Number(that.ruleForm.courseKind),
              courseImg: String(that.imgUrl),
              courseMediaUrl: String(that.imgUrl1),
              courseCategory: that.courseCategory
            }).then(data => {
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
          } 
        });
      },
      handleChange(file) {
        this.file = file.raw;
        this.fileList = [this.file];
        this.imgUrl = '';
       }, 
      handleChange1(file) {
        this.file1 = file.raw;
        this.fileList1 = [this.file1];
        this.imgUrl1 = '';
       },  
      handleChange2(file) {
        this.file2 = file.raw;
        this.fileList2 = [this.file2];
        this.imgUrl2 = '';
       },                   
      resetForm(formName) {
        var that = this;
        this.$refs[formName].resetFields();
                            that.file = null;
                    that.fileList = [];
                    that.imgUrl = '';
                             that.file1 = null;
                    that.fileList1 = [];
                    that.imgUrl1 = '';
                            that.file2 = null;
                    that.fileList22 = [];
                    that.imgUrl2 = '';                                       
                    that.courseCategory = []
      },
      restxiao(){
        var that = this;
                            that.file2 = null;
                    that.fileList22 = [];
                    that.imgUrl2 = '';                                       
                    that.courseCategory = []
                    this.xiaojieName='';
                    that.xiaojieDetail = '';
      },
      submitUpload() {
          // console.log(this.$refs.upload)
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
       submitUpload1() {
          // console.log(this.$refs.upload)
        // this.$refs.upload.submit();
 		let form = new FormData();
		// 后端接受参数 ，可以接受多个参数
		form.append("file",this.file1)
		form.append(" "," ")       
        let that = this;
        uploadFile(form).then(data => {
            console.log(data)
            if (data.errCode === '200') {
                that.imgUrl1 = data.body.resultUrl;
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
       submitUpload2() {
        // this.$refs.upload.submit();
 		let form = new FormData();
		// 后端接受参数 ，可以接受多个参数
		form.append("file",this.file2)
		form.append(" "," ")       
        let that = this;
        uploadFile(form).then(data => {
            console.log(data)
            if (data.errCode === '200') {
                that.imgUrl2 = data.body.resultUrl;
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
        this.imgUrl = '';
      },
       handleRemove1(file, fileList) {
        console.log(file, fileList);
        this.imgUrl1 = '';
      },
      handleRemove2(file, fileList) {
        console.log(file, fileList);
        this.imgUrl2 = '';
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
.xiaojei-li{
  border: 1px solid #bfcbd9;
  padding: 30px;
  border-radius: 5px;
}
</style>
