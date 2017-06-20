<template>
  <div id="Score">
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
            <el-table-column fixed="right" label="操作" width="190">
              <template scope="scope">
                <el-button @click="EditClick" type="text" size="small" icon="edit">编辑</el-button>
                <el-button @click="InfoClick" type="text" size="small" icon="information">详情</el-button>
                <el-button type="text" size="small" icon="delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <el-dialog title="Tips" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <span>This is a message</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="更改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Promotion name" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Zones" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="Please select a zone">
            <el-option label="Zone No.1" value="shanghai"></el-option>
            <el-option label="Zone No.2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }],
      msg: '得分榜',
      dialogVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },

  created() {
    this.axios.get('/api/competition').then((response) => {
      console.log(response.data);
      this.tableData3 = response.data;
    });
  },
  methods: {
    EditClick() {
      console.log('click');
      this.dialogFormVisible = true;
    },
    InfoClick() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done();
        })
        .catch(_ => { });
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
