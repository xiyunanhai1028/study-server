<template>
    <div class="con-container">
      <div class="table-bottom">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="username"
            label="姓名"
            width="">
            </el-table-column>
             <el-table-column
            prop="username"
            label="账号"
            width="">
            </el-table-column>                     
            <el-table-column
            prop="teacherId"
            label="ID"
            width="">
            </el-table-column>
                <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="goPage(scope.row)" type="text" size="small">添加课程</el-button>
        <!-- <el-button type="text" size="small">编辑</el-button> -->
      </template>
    </el-table-column>
        </el-table>           
          </div>  
    </div>
</template>

<script>
    import { getTeacherList } from '../../api/api';
    export default {
        data() {
            return {
                tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }]               
            }
        },

        methods: {
    goPage(prams){
      console.log(prams)
      let path = '/CreateCurriculum'
      this.$router.push({ path: path, query: { userData: JSON.stringify(prams)}})
    }     
  
     
        },
        created(){
            var that = this;
            getTeacherList({}).then(data => {
            console.log(data)
            if (data.errCode === '200') {
                that.tableData = data.body
            } 
        })
        },
        mounted: function () {
            // this.drawCharts()
        },
        updated: function () {
            // this.drawCharts()
        }
    }
</script>

<style scoped>
.table-bottom {
    margin-top: 50px;
}
</style>
