<template>
  <div id="Player">
    <h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">Let's do it</el-button>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3">
        <div class="grid-content">
          <el-input placeholder="战队筛选" icon="search" v-model="teamFilter" :on-icon-click="handleIconClick">
          </el-input>
        </div>
      </el-col>
      <el-col :xs="8" :sm="12" :md="16" :lg="18">
        <div class="grid-content bg-purple" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table :data="tableData3" height="500" border style="width: 100%">
            <el-table-column prop="id" label="队员序号" width="180" sortable>
            </el-table-column>
            <el-table-column prop="name" label="队员姓名" width="180">
            </el-table-column>
            <el-table-column prop="team" label="所属战队">
            </el-table-column>
            <el-table-column prop="like" label="擅长类型" :filters="likeFilter" :filter-method="filterTag" filter-placement="bottom-end">
              <template scope="scope">
                <el-tag :type="tagType(scope.row.like)" close-transition>{{scope.row.like}}</el-tag>
              </template>
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
        <el-form-item label="选手ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="选手姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属战队" :label-width="formLabelWidth">
          <el-input v-model="form.team" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="擅长类型" :label-width="formLabelWidth">
          <el-select v-model="form.like" placeholder="请选择类型">
            <el-option label="WEB" value="WEB"></el-option>
            <el-option label="PWN" value="PWN"></el-option>
            <el-option label="REVERSE" value="REVERSE"></el-option>
            <el-option label="CRYPTO" value="CRYPTO"></el-option>
            <el-option label="MISC" value="MISC"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="EditRecord">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建记录" :visible.sync="dialogNewVisible">
      <el-form :model="newform">
        <el-form-item label="选手姓名" :label-width="formLabelWidth">
          <el-input v-model="newform.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属战队" :label-width="formLabelWidth">
          <el-input v-model="newform.team" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="擅长类型" :label-width="formLabelWidth">
          <el-select v-model="newform.like" placeholder="请选择类型">
            <el-option label="WEB" value="WEB"></el-option>
            <el-option label="PWN" value="PWN"></el-option>
            <el-option label="REVERSE" value="REVERSE"></el-option>
            <el-option label="CRYPTO" value="CRYPTO"></el-option>
            <el-option label="MISC" value="MISC"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="NewRecord">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      likeFilter: [
        { text: 'WEB', value: 'WEB' },
        { text: 'REVERSE', value: 'REVERSE' },
        { text: 'PWN', value: 'PWN' },
        { text: 'CRYPTO', value: 'CRYPTO' },
        { text: 'MISC', value: 'MISC' }
      ],
      teamFilter: '',
      tableData3: [],
      msg: '选手榜',
      dialogNewVisible: false,
      dialogVisible: false,
      dialogEditVisible: false,
      form: {
        id: '',
        name: '',
        team: '',
        like: ''
      },
      newform: {
        name: '',
        team: '',
        like: ''
      },
      formLabelWidth: '120px'
    }
  },

  created() {
    let params = {};
    if (window.location.pathname === "/player/2") params.type = 2;
    this.axios.get('/api/player', { params: params }).then((response) => {
      // console.log(response.data);
      this.tableData3 = response.data;
    });
  },
  methods: {
    tagType(like) {
      switch (like) {
        case 'WEB': return 'danger';
        case 'REVERSE': return 'warning';
        case 'PWN': return 'success';
        case 'CRYPTO': return 'primary';
        case 'MISC': return 'gray';
        default: return 'success';
      }
    },
    NewRecord() {
      let data = { name: this.newform.name, team: this.newform.team, like: this.newform.like };
      this.axios.post('/api/newplayer', data).then((response) => {
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
        this.axios.get('/api/player').then((response) => {
          this.tableData3 = response.data;
        });
      });
    },
    EditRecord() {
      let data = { id: this.form.id, name: this.form.name, team: this.form.team, like: this.form.like };
      this.axios.post('/api/editplayer', data).then((response) => {
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
        this.axios.get('/api/player', ).then((response) => {
          this.tableData3 = response.data;
        });
      });
    },
    DeleteRecord(id) {
      let data = { id: id };
      this.axios.post('/api/deleteplayer', data).then((response) => {
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
          });
        }

      });
    },
    handleIconClick(ev) {
      // console.log(ev);
      let cond = {};
      if (this.teamFilter !== '') cond.TNAME = this.teamFilter;
      this.axios.get('/api/player', { params: cond }).then((response) => {
        console.log(response.data);
        this.tableData3 = response.data;
      });
    },
    NewClick() {
      this.dialogNewVisible = true;
    },
    EditClick(index) {
      this.form.id = this.tableData3[index].id;
      this.form.name = this.tableData3[index].name;
      this.form.team = this.tableData3[index].team;
      this.form.like = this.tableData3[index].like;
      this.dialogEditVisible = true;
    },
    InfoClick(index) {
      this.dialogVisible = true;
    },
    DeleteClick(index) {
      this.$confirm('确定删除 ' + this.tableData3[index].name + "吗？")
        .then(_ => {
          this.DeleteRecord(this.tableData3[index].id);
          this.tableData3.splice(index, 1);
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
    },
    filterTag(value, row) {
      return row.like === value;
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
