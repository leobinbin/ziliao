<template>
  <div class="wrap">
    <div class="title">资料管理</div>
    <el-container>
      <el-header class="hd">
        <div>
          <el-button style="background-color: #1ab394;color:#fff;" size="small" @click="newOrUpload">上传/新建</el-button>
        </div>
        <div class="second">
          <span @click="toggleClass" class=" item active">公共区</span>
          <span @click="toggleClass" class="item">项目区</span>
          <span @click="toggleClass" class="item">示范区</span>
        </div>
        <div class="three">

          <span class="pad-r10"> <i class="el-icon-goblet-full pad-r10"></i>筛选</span>
          <el-input
            size="small"
            style="width: 200px;padding-right: 20px;"
            placeholder="请输入内容"
            v-model="input4">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-header>
      <el-main>
        <el-breadcrumb separator="|" style="height: 40px;line-height: 40px;background-color: #eee;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <template>
          <el-table
            ref="multipleTable"
            :data="tableData"
            @row-click='singleClick'
            @row-dblclick='doubleClick'
            tooltip-effect="dark"
            @cell-mouse-enter='cellEnter'
            @cell-mouse-leave='cellLeave'
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <!--<el-table-column type="expand">-->
            <!--<template slot-scope="props">-->
            <!--<el-form label-position="left" inline class="demo-table-expand">-->
            <!--<el-form-item label="商品名称">-->
            <!--<span>{{ props.row.name }}</span>-->
            <!--</el-form-item>-->
            <!--</el-form>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              class="clearfix"
              prop="date"
              label="文件名"
              width="380">
              <template slot-scope="scope">
                <span class="fileName"><el-link @click="openFile"><i class="el-icon-folder pad-r10"></i>{{scope.row.name}}</el-link></span>

                <div class="dot fr"
                     style="padding-right: 40px;cursor: pointer;display:none;color: blue;font-size: 20px;">
                  <el-tooltip class="item" effect="light" placement="right-end">
                    <div slot="content">
                      <el-link class="limite" :underline="false" @click="upload">下载</el-link>
                      <br>
                      <el-link class="limite" :underline="false" @click="upload">移动</el-link>
                      <br>
                      <el-link class="limite" :underline="false" @click="upload">删除</el-link>
                      <br>
                      <el-link class="limite" :underline="false" @click="upload">重命名</el-link>
                      <br>
                      <el-link class="limite" :underline="false" @click="qualityDesign">权限设置</el-link>
                      <br/>
                    </div>
                    <span>...</span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="大小"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="name"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="name"
              label="所属模块">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名臣">
            </el-table-column>
            <el-table-column
              prop="name"
              label="上传方式">
            </el-table-column>
            <el-table-column
              prop="date"
              label="最后更新时间">
            </el-table-column>

          </el-table>
        </template>
      </el-main>
      <el-footer>
        <el-pagination
          style="margin-top: 19px;text-align: center;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-footer>
      <el-dialog title="文件名" :visible.sync="subFileVisible" width="80%">
        <div class="subFile">
          <div class="left">
            <ul>
              <li class="subFileLine" v-for="(item,index) in 4" :key="index">
                <i class="el-icon-video-camera pad-10 bgc-fff"></i>
                <el-input style="width: 250px;padding-right: 10px;" size="small" value="官方公告.mp4"></el-input>
                <i class="el-icon-check pad-10 bgc-fff"></i>
                <i class="el-icon-close pad-10 bgc-fff"></i>
              </li>
            </ul>
          </div>

          <div style="position: relative;">
            <el-button style="background-color: #1ab394;color:#fff;margin-left:20px;" size="small" @click="newOrUpload">
              上传/新建
            </el-button>
            <div v-if="showNewOrUpload" style="position: absolute;left: 120px;top:0">
              <el-button size="small" @click="newOrUpload">上传<i class="el-icon-upload el-icon--right"></i></el-button>
              <el-button size="small" @click="newOrUpload">新建<i class="el-icon-folder-add el-icon--right"></i>
              </el-button>
            </div>
          </div>
        </div>

      </el-dialog>

      <el-dialog

        title="权限设置"
        :visible.sync="quanxianDialogVisible"
        width="50%"
        center>
        <div style="height: 500px">
          <div class="designLine">
            <i class="el-icon-picture-outline"></i>
            <span>最新效果图.jpg</span>
          </div>
          <div class="designLine clearfix">
            <span>全员可见</span>
            <el-switch
              class="fr"
              style="margin-top: 10px;"
              v-model="allCanSee"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
          <div class="designLine " style="border-bottom: 0;">
            <p>设置指定成员权限</p>
          </div>
          <div class="designLine " style="border-bottom: 0;">
            <p>添加管理员</p>
          </div>
          <div class="designLine " style="border-bottom: 0;">
            <p>管理员默认啦啦啦啦啦啦啦啦啦啦啊啊</p>
          </div>
          <div class="manage" v-for="(item,index) in 4" :key="index">
            <div>
              <el-image
                style="width: 40px; height: 40px;border-radius: 50%"
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564428336974&di=130e4b742022d180dd9906a195964767&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F12%2F20151212193107_ujGZV.jpeg"
                :fit="fit">
              </el-image>
              <span>王健林</span>
            </div>
            <div style="text-align:right;">
              <!--<span style="cursor: pointer;">创建者 <i class="el-icon-caret-bottom"></i></span>-->
              <el-dropdown>
                <span class="el-dropdown-link">
                  创建者<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width: 300px;"  >
                  <el-dropdown-item class="clearfix"><span class="fl">可管理</span> <span class="fr" style="font-size: 12px;color:#ccc;">下载/查看/编辑/删除</span></el-dropdown-item>
                  <el-dropdown-item class="clearfix"><span class="fl">可编辑</span><span class="fr" style="font-size: 12px;color:#ccc;">下载/查看/编辑</span></el-dropdown-item>
                  <el-dropdown-item class="clearfix"><span class="fl">可查看</span><span class="fr" style="font-size: 12px;color:#ccc;">下载/查看</span></el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>


        <span slot="footer" class="dialog-footer">
        <el-button @click="quanxianDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="quanxianDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        showNewOrUpload: false,//新建或上传
        input4: '',

        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
        ],
        multipleSelection: [],
        currentPage4: 4,
        total: 100,
        //子文件
        subFileVisible: false,
        //子列表

        //权限设置框
        quanxianDialogVisible: false,
        //全员可见
        allCanSee: true

      }
    },
    methods: {
      newOrUpload() {
        this.showNewOrUpload = true;
      },
      toggleClass(e) {
        this.$jq(".item").removeClass("active");
        this.$jq(e.target).addClass("active");
      },
      //单击行
      singleClick(row, column, event) {
        console.log(row, column, event)
      },
      //双击行
      doubleClick(row, column, event) {
        console.log(row, column, event)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      cellEnter(row, column, cell, event) {
        //console.log(row, column, cell)
        if (column.label === '文件名') {
          this.$jq(event.target.parentNode).find('.dot').get(0).style.display = 'block';
          this.$jq(event.target.parentNode).find('.fileName').get(0).style.color = 'skyblue';
        }
      },
      cellLeave(row, column, cell, event) {
        if (column.label === '文件名') {
          this.$jq(event.target.parentNode).find('.dot').get(0).style.display = 'none';
          this.$jq(event.target.parentNode).find('.fileName').get(0).style.color = '#606266';
        }
      },
      //点击hover文字
      openFile() {
        console.log('open');
        this.subFileVisible = true;
      },

      upload() {
        console.log(123456)
      },
      //权限设置
      qualityDesign() {
        this.quanxianDialogVisible = true;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .wrap {
    height: 100%;
    .title {
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
    }
    .el-container {
      .hd {
        display: flex;
        width: 100%;
        div {
          height: 50px;
          line-height: 50px;
          flex: 1;
        }
        .second {
          text-align: center;
          .active {
            font-weight: bold;
            font-size: 16px;
            color: #1ab394;
          }
          span {
            padding: 0 20px;
          }
        }
        .three {
          text-align: right;
        }
      }

      .el-main {
        padding: 0 20px;
        background-color: #f8f8f8;

      }
    }
  }

  .limite {
    display: inline-block;
    padding: 6px 10px;
  }

  .subFile {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;

    div {
      flex: 1;
      width: 50%;
    }
    .left {
      background-color: #eee;
    }
    .subFileLine {
      margin: 10px;
      padding-left: 10px;

    }
  }

  .designLine {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
  }

  .manage {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    div {
      flex: 1;
      vertical-align: middle;
      span {
        vertical-align: middle;
      }
      .el-image {
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
</style>
