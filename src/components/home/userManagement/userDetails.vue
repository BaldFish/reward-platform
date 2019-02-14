<template>
  <div class="userDetails">
    <div class="user-info">
      <h3 style="font-size: 20px;font-weight: bold;color: #000000">基本信息</h3>
      <br>
      <table>
        <tbody>
        <tr>
          <td>手机号：</td>
          <td>{{userInfo.phone}}</td>
          <td>账号注册日期：</td>
          <td>{{userInfo.created_at}}</td>
          <td></td>
        </tr>
        <tr>
          <td>钱包地址1（默认）：</td>
          <td>{{userInfo.wallet_address}}</td>
          <td>钱包地址2：</td>
          <td>{{userInfo.wallet_address2}}</td>
          <td></td>
        </tr>
        <tr>
          <td>姓名：</td>
          <td>{{userInfo.realname}}</td>
          <td>邮箱：</td>
          <td>{{userInfo.email}}</td>
          <td></td>
        </tr>
        <tr>
          <td>身份证号：</td>
          <td>{{userInfo.idcard}}</td>
          <td>认证时间：</td>
          <td>{{userInfo1.personcreated_at}}</td>
          <td></td>
        </tr>
        <tr>
          <td>行驶证：</td>
          <td style="color: red">{{userInfo1.red_chapter}}</td>
          <td>认证时间：</td>
          <td>{{userInfo1.updated_at}}</td>
          <td><a :href="userInfo1.url" target="_blank" v-if="userInfo.carinfo">查看照片</a></td>
        </tr>
        <tr>
          <td>车牌号：</td>
          <td>{{userInfo1.plat_num}}</td>
          <td>车辆类型：</td>
          <td>{{userInfo1.car_type}}</td>
          <td></td>
        </tr>
        <tr>
          <td>所有人：</td>
          <td>{{userInfo1.name}}</td>
          <td>地址：</td>
          <td>{{userInfo1.address}}</td>
          <td></td>
        </tr>
        <tr>
          <td>品牌型号：</td>
          <td>{{userInfo1.brand_model_num}}</td>
          <td>使用性质：</td>
          <td>{{userInfo1.use_type}}</td>
          <td></td>
        </tr>
        <tr>
          <td>发动机号码：</td>
          <td>{{userInfo1.engine_no}}</td>
          <td>车辆识别代号：</td>
          <td>{{userInfo1.car_vin}}</td>
          <td></td>
        </tr>
        <tr>
          <td>注册登记日期：</td>
          <td>{{userInfo1.register_data}}</td>
          <td>发证日期：</td>
          <td>{{userInfo1.issue_data}}</td>
          <td></td>
        </tr>
        <tr>
          <td>驾驶证：</td>
          <td>{{""}}</td>
          <td>认证时间：</td>
          <td>{{""}}</td>
          <td><a :href="userInfo.driverlicense" target="_blank" v-if="userInfo.driverlicense">查看照片</a></td>
        </tr>
        <tr>
          <td>支付宝账号：</td>
          <td>{{userInfo.alipay}}</td>
          <td>绑定时间：</td>
          <td>{{""}}</td>
          <td></td>
        </tr>
        <tr>
          <td>居住地：</td>
          <td>{{userInfo.residence}}</td>
          <td>学历：</td>
          <td>{{userInfo.degree}}</td>
          <td></td>
        </tr>
        <tr>
          <td>职业：</td>
          <td>{{userInfo.career}}</td>
          <td>用户来源：</td>
          <td>{{userInfo.platform}}</td>
          <td></td>
        </tr>
        <tr>
          <td>职业认证：</td>
          <td>{{userInfo.rolename}}</td>
          <td>绑定时间：</td>
          <td>{{""}}</td>
          <td>
            <a :href="userInfo.roleimg" target="_blank" v-if="userInfo.roleimg">查看照片</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="user-account">
      <template>
        <!--第1层tab-->
        <el-tabs v-model="type1" @tab-click="type1TabClick">
          <div>
            <h3>账户金额</h3>
            <table class="account-amount">
              <thead>
              <tr>
                <th></th>
                <th>元积分</th>
                <th>广告豆</th>
                <th>元豆豆</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>金额</th>
                <td>{{totalYJF}}</td>
                <td>{{totalGGD}}</td>
                <td>{{totalYDD}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--钱包地址1-->
          <el-tab-pane label="钱包地址1" name="1">
            <template>
              <!--第2层tab-->
              <el-tabs v-model="type2" @tab-click="type2TabClick" style="margin-left: 20px">
                <!--第3层tab筛选和搜索-->
                <el-radio-group v-model="type3" style="margin-bottom: 30px;float: left;" @change="type3TabClick">
                  <el-radio-button label="1">全部</el-radio-button>
                  <el-radio-button label="2">奖励</el-radio-button>
                  <el-radio-button label="3">扣款</el-radio-button>
                  <el-radio-button label="4">转账</el-radio-button>
                </el-radio-group>
                <div class="time-query">
                  <span>创建时间：</span>
                  <el-date-picker class="date_input" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                  <el-button @click="search">搜索</el-button>
                </div>
                <el-tab-pane label="元积分" name="1">
                  <!--表格-->
                  <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                    <el-table-column label="钱包地址" align="center" min-width="400">
                      <template slot-scope="scope">
                        <span>{{ scope.row.walletaddress }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.updated_at }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.value }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.rule }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="广告豆" name="2">
                  <!--表格-->
                  <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                    <el-table-column label="钱包地址" align="center" min-width="400">
                      <template slot-scope="scope">
                        <span>{{ scope.row.walletaddress }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center"  min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.updated_at }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center"  min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.value }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center"  min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.rule }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="元豆豆" name="3">
                  <!--表格-->
                  <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                    <el-table-column label="钱包地址" align="center" min-width="400">
                      <template slot-scope="scope">
                        <span>{{ scope.row.walletaddress }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.updated_at }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.value }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.rule }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </template>
          </el-tab-pane>
          <!--钱包地址2-->
          <el-tab-pane label="钱包地址2" name="2">
            <template>
              <!--第2层tab-->
              <el-tabs v-model="type2" @tab-click="type2TabClick" style="margin-left: 20px">
                <!--第3层tab筛选和搜索-->
                <el-radio-group v-model="type3" style="margin-bottom: 30px;float: left;" @change="type3TabClick">
                  <el-radio-button label="1">全部</el-radio-button>
                  <el-radio-button label="2">奖励</el-radio-button>
                  <el-radio-button label="3">扣款</el-radio-button>
                  <el-radio-button label="4">转账</el-radio-button>
                </el-radio-group>
                <div class="time-query">
                  <span>创建时间：</span>
                  <el-date-picker class="date_input" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                  <el-button @click="search">搜索</el-button>
                </div>
                <el-tab-pane label="元积分" name="1">
                  <!--表格-->
                  <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                    <el-table-column label="钱包地址" align="center" min-width="400">
                      <template slot-scope="scope">
                        <span>{{ scope.row.walletaddress }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.updated_at }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.value }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.rule }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="广告豆" name="2">
                  <!--表格-->
                  <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                    <el-table-column label="钱包地址" align="center" min-width="400">
                      <template slot-scope="scope">
                        <span>{{ scope.row.walletaddress }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center"  min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.updated_at }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center"  min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.value }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center"  min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.rule }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="元豆豆" name="3">
                  <!--表格-->
                  <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                    <el-table-column label="钱包地址" align="center" min-width="400">
                      <template slot-scope="scope">
                        <span>{{ scope.row.walletaddress }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="创建时间" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.updated_at }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.value }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center" min-width="150">
                      <template slot-scope="scope">
                        <span>{{ scope.row.rule }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </template>
          </el-tab-pane>
          <!--分页-->
          <div class="block" style="text-align:center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size=limit
              :page-sizes="[5, 10, 20, 30]"
              layout="total, sizes, prev, pager, next, jumper"
              :total=total>
            </el-pagination>
          </div>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userDetails",
    components: {},
    data() {
      return {
        userId: "",
        type1: "1",
        type2: "1",
        type3: "1",
        time: ["",""],
        userInfo: {},
        userInfo1: {},
        totalYJF: "",
        totalYDD: "",
        totalGGD: "",
        tableData: [],
        currentPage: 1,
        total: 10,
        page: 1,
        limit: 10,
      }
    },
    created() {
    },
    beforeMount() {
      this.userId = JSON.parse(sessionStorage.getItem("clickInfo"))._id;
      this.queryUserInfo();
    },
    mounted() {
    },
    watch: {
      time: function () {
        if (this.time === null) {
          this.time = ["",""]
        }
      }
    },
    computed: {},
    methods: {
      //点击搜索按钮搜索
      search(){
        this.page=1;
        this.queryUserInfo();
      },
      //查询用户基本信息和交易流水
      queryUserInfo() {
        let data = {
          user_id: this.userId,
          type1: this.type1,
          type2: this.type2,
          type3: this.type3,
          start: new Date(this.time[0]).toUTCString()==="Invalid Date"?"":new Date(this.time[0]).toUTCString(),
          end: new Date(this.time[1]).toUTCString()==="Invalid Date"?"":new Date(this.time[1]).toUTCString(),
          page: this.page,
          limit: this.limit,
        };
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/backstage/users/findid`,
          data: this.$querystring.stringify(data),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then(res => {
          res.data.user.created_at = this.$utils.formatDate(new Date(res.data.user.created_at), "yyyy-MM-dd hh:mm:ss");
          this.userInfo = res.data.user;
          this.total = res.data.transction.data.count;
          this.totalYJF = res.data.totalyuanj;
          this.totalYDD = res.data.totalydd;
          this.totalGGD = res.data.totalyuand;
          if (res.data.certification.res.personcreated_at) {
            res.data.certification.res.personcreated_at = this.$utils.formatDate(new Date(res.data.certification.res.personcreated_at), "yyyy-MM-dd hh:mm:ss");
          }
          if(res.data.certification.res.created_at){
            res.data.certification.res.created_at = this.$utils.formatDate(new Date(res.data.certification.res.created_at), "yyyy-MM-dd hh:mm:ss");
          }
          if(res.data.certification.res.updated_at){
            res.data.certification.res.updated_at = this.$utils.formatDate(new Date(res.data.certification.res.updated_at), "yyyy-MM-dd hh:mm:ss");
          }
          this.userInfo1 = res.data.certification.res;
          let that = this;
          res.data.transction.data.txn.forEach(function (item) {
            if(item.updated_at){
              item.updated_at = that.$utils.formatDate(new Date(item.updated_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.tableData = res.data.transction.data.txn
        }).catch(error => {
          console.log(error)
        })
      },
      //点击第1层选项卡
      type1TabClick(tab) {
        this.page = 1;
        this.type1 = tab.name;
        this.type2 = "1";
        this.type3 = "1";
        this.queryUserInfo();
      },
      //点击第2层选项卡
      type2TabClick(tab) {
        this.page = 1;
        this.type2 = tab.name;
        this.type3 = "1";
        this.queryUserInfo();
      },
      //点击第3层选项卡
      type3TabClick(tab) {
        this.page = 1;
        this.type3 = tab;
        this.queryUserInfo();
      },
      //更改每页显示条数
      handleSizeChange(val) {
        this.limit = val;
        this.queryUserInfo();
      },
      //切换分页
      handleCurrentChange(val) {
        this.page = val;
        this.queryUserInfo();
      },
    },
  }
</script>

<style scoped lang="stylus">
  .userDetails {
    .user-info {
      margin: 20px
      
      table {
        td {
          width: 300px
          height: 40px
          line-height 40px
          border: 1px solid #ebeef5
          text-align center
          
          a {
            color #6e6f77
          }
        }
      }
    }
    
    .user-account {
      margin-bottom 50px
      
      h3 {
        margin: 10px 20px 20px 20px
      }
      
      .account-amount {
        margin-bottom 20px
        
        th, td {
          width: 100px
          height: 30px
          line-height 30px
          border: 1px solid #ebeef5
          text-align center
        }
      }
      
      .time-query {
        float right
        padding-right 30px
      }
    }
  }
</style>
