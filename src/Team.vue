<template>
  <div id="Team">
<h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">Let's do it</el-button>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3">
        <div class="grid-content"></div>
      </el-col>
      <el-col :xs="8" :sm="12" :md="16" :lg="18">
        <div class="grid-content bg-purple">
          <el-table :data="tableData3" height="250" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="比赛名称" width="180">
            </el-table-column>
            <el-table-column prop="address" label="主办方">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template scope="scope">
                <el-button @click="handleClick" type="text" size="small">详情</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MyHeader from './Header.vue'
export default {
    data() {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }],
      msg: '战队榜'
    }
  },
  created() {
    this.axios.get('/api/competition').then((response) => {
      console.log(response.data);
      this.tableData3 = response.data;
    });
  },
  methods: {
    handleClick() {
      console.log('click');
    },
    startHacking() {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  },
}
</script>
<style>
body {
  font-family: Helvetica, sans-serif;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
