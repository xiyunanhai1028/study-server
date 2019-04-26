<template>
    <div class="con-container">
      <div class="table-bottom">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="名字"
            width="">
            </el-table-column>
             <el-table-column
            prop="sort"
            label="序号"
            width="">
            </el-table-column>      
              <el-table-column
            prop="url"
            label="url"
            width="">
            </el-table-column>                   
        </el-table>           
          </div>  
    </div>
</template>

<script>
    import { getScrollImageList } from '../../api/api';
    export default {
        data() {
            return {
                tableData: []               
            }
        },

        methods: {
     
        },
        created(){
            var that = this;
            getScrollImageList({}).then(data => {
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
