<template>
  <div id="Score">
    <h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">Let's do it</el-button>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3">
        <div class="grid-content">
          <el-input placeholder="比赛筛选" icon="search" v-model="comFilter" :on-icon-click="handleIconClick">
          </el-input>
          <el-input placeholder="战队筛选" icon="search" v-model="teamFilter" :on-icon-click="handleIconClick">
          </el-input>
        </div>
      </el-col>
      <el-col :xs="8" :sm="12" :md="16" :lg="18">
        <div class="grid-content bg-purple" :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table :data="tableData3" height="500" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" sortable>
            </el-table-column>
            <el-table-column prop="name" label="比赛名称" width="180">
            </el-table-column>
            <el-table-column prop="team" label="战队">
            </el-table-column>
            <el-table-column prop="score" label="得分" sortable>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="190">
              <template scope="scope">
                <el-button @click="EditClick(scope.$index)" type="text" size="small" icon="edit">编辑</el-button>
                <el-button @click="InfoClick(scope.$index)" type="text" size="small" icon="information">详情</el-button>
                <el-button @click="DeleteClick(scope.$index)" type="text" size="small" icon="delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3">
        <div class="grid-content">
          <el-button @click="NewClick" type="success">新建记录</el-button>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="Tips" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <span>This is a message</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="更改信息" :visible.sync="dialogEditVisible">
      <el-form :model="form">
        <el-form-item label="比赛名称" :label-width="formLabelWidth">
          <el-input v-model="form.com" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="战队名称" :label-width="formLabelWidth" :disabled="true">
          <el-select v-model="form.team" placeholder="Please select a zone" :disabled="true">
            <el-option label="Cr4ck1ng" value="Cr4ck1ng"></el-option>
            <el-option label="Asuri" value="Asuri"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分数" :label-width="formLabelWidth">
          <el-input v-model="form.score" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">Cancel</el-button>
        <el-button type="primary" @click="EditRecord">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建记录" :visible.sync="dialogNewVisible">
      <el-form :model="newform">
        <el-form-item label="比赛名称" :label-width="formLabelWidth">
          <el-input v-model="newform.com" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="战队名称" :label-width="formLabelWidth">
          <el-input v-model="newform.team" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="分数" :label-width="formLabelWidth">
          <el-input v-model="newform.score" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="NewRecord">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      comFilter: '',
      teamFilter: '',
      tableData3: [],
      msg: '得分榜',
      dialogNewVisible: false,
      dialogVisible: false,
      dialogEditVisible: false,
      form: {
        com: '',
        team: '',
        score: ''
      },
      newform: {
        com: '',
        team: '',
        score: ''
      },
      formLabelWidth: '120px'
    }
  },

  created() {
    this.axios.get('/api/score').then((response) => {
      // console.log(response.data);
      this.tableData3 = response.data;
    });
  },
  methods: {
    NewRecord() {
      let data = { com: this.newform.com, team: this.newform.team, score: this.newform.score };
      this.axios.post('/api/newscore', data).then((response) => {
        console.log(response.data);
        if (response.data.status === 0) {
          this.dialogNewVisible = false;
          this.$notify({
            title: '大成功！',
            message: '成功添加记录',
            duration: 3000
          });
        } else {
          this.$notify({
            title: '失败了！',
            message: response.data.msg,
            duration: 3000
          })
        }

      });
    },
    EditRecord() {
      let data = { com: this.form.com, team: this.form.team, score: this.form.score };
      this.axios.post('/api/editscore', data).then((response) => {
        console.log(response.data);
        if (response.data.status === 0) {
          this.dialogEditVisible = false;
          this.$notify({
            title: '大成功！',
            message: '成功修改记录',
            duration: 3000
          });
        } else {
          this.$notify({
            title: '失败了！',
            message: response.data.msg,
            duration: 3000
          })
        }

      });
    },
    DeleteRecord(com, team) {
      let data = { com: com, team: team };
      this.axios.post('/api/deletescore', data).then((response) => {
        console.log(response.data);
        if (response.data.status === 0) {
          this.$notify({
            title: '大成功！',
            message: '成功删除记录',
            duration: 3000
          });
        } else {
          this.$notify({
            title: '失败了！',
            message: response.data.msg,
            duration: 3000
          })
        }

      });
    },
    handleIconClick(ev) {
      // console.log(ev);
      let cond = {};
      if (this.comFilter !== '') cond.CNAME = this.comFilter;
      if (this.teamFilter !== '') cond.TNAME = this.teamFilter;
      this.axios.get('/api/score', { params: cond }).then((response) => {
        console.log(response.data);
        this.tableData3 = response.data;
      });
    },
    NewClick() {
      this.dialogNewVisible = true;
    },
    EditClick(index) {
      this.form.com = this.tableData3[index].name;
      this.form.team = this.tableData3[index].team;
      this.form.score = this.tableData3[index].score;
      this.dialogEditVisible = true;
    },
    InfoClick(index) {
      this.dialogVisible = true;
    },
    DeleteClick(index) {
      this.$confirm('确定删除 ' + this.tableData3[index].name + " 中队伍 " + this.tableData3[index].team + "的成绩吗？")
        .then(_ => {
          this.tableData3.splice(index, 1);
          this.DeleteRecord(this.tableData3[index].name, this.tableData3[index].team);
        })
        .catch(_ => { });
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

.el-input {
  margin-bottom: 20px;
}
</style>