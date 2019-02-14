<template>
  <div class="accountRanking">
    <div class="list_wrap">
      <div>
        <h3 style="font-size: 20px;font-weight: bold;color: #000;">账户金额排行</h3>
        <br>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="元积分金额排行" name="first">
              <el-table :data="yuanPointsList" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="钱包地址" align="center" min-width="400">
                  <template slot-scope="scope">
                    <span>{{ scope.row.wallet_address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.realname }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="金额" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.yuanj }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="占比" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{(scope.row.rate *100).toFixed(2) }}%</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block" style="text-align:center">
                <el-pagination
                  @size-change="handleSizeChange_yuanPoint"
                  @current-change="handleCurrentChange_yuanPoint"
                  :current-page.sync="currentPage_yuanPoint"
                  :page-size=10
                  :page-sizes="[5, 10, 20, 30]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total=yuanPointTotal>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="广告豆金额排行" name="second">
              <el-table :data="advBeansList" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="钱包地址" align="center" min-width="400">
                  <template slot-scope="scope">
                    <span>{{ scope.row.wallet_address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.realname }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="金额" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.yuand }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="占比" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{(scope.row.rate *100).toFixed(2) }}%</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block" style="text-align:center">
                <el-pagination
                  @size-change="handleSizeChange_advBeans"
                  @current-change="handleCurrentChange_advBeans"
                  :current-page.sync="currentPage_advBeans"
                  :page-size=10
                  :page-sizes="[5, 10, 20, 30]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total=advBeansTotal>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="元豆豆金额排行" name="third">
              <el-table :data="yuanBeansList" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="钱包地址" align="center" min-width="400">
                  <template slot-scope="scope">
                    <span>{{ scope.row.wallet_address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.realname }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="金额" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ydd }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="占比" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{(scope.row.rate *100).toFixed(2) }}%</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block" style="text-align:center">
                <el-pagination
                  @size-change="handleSizeChange_yuanBeans"
                  @current-change="handleCurrentChange_yuanBeans"
                  :current-page.sync="currentPage_yuanBeans"
                  :page-size=10
                  :page-sizes="[5, 10, 20, 30]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total=yuanBeansTotal>
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "accountRanking",
    components: {},
    data() {
      return {
        activeName: 'first',
        //元积分
        yuanPointsList: [],
        yuanPointTotal: 10,
        page_yuanj: 1,
        limit_yuanj: 10,
        currentPage_yuanPoint: 1,
        //广告豆
        advBeansList: [],
        advBeansTotal: 10,
        page_yuand: 1,
        limit_yuand: 10,
        currentPage_advBeans: 1,
        //元豆豆
        yuanBeansList: [],
        yuanBeansTotal: 10,
        page_ydd: 1,
        limit_ydd: 10,
        currentPage_yuanBeans: 1,
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      this.activeName = "first";
      //获取元积分列表
      this.page_yuanj = 1;
      this.limit_yuanj = 10;
      this.getYuanPointsList()
    },
    watch: {},
    computed: {},
    methods: {
      handleClick(tab, event) {
        if(tab.name == "first"){
          //this.page_yuanj = 1;
          //this.limit_yuanj = 5;
          this.getYuanPointsList()
        }else if(tab.name == "second"){
          //this.page_yuand = 1;
          //this.limit_yuand = 5;
          this.getAdvBeansList()
        }else if(tab.name == "third"){
          //this.page_ydd = 1;
          //this.limit_ydd = 5;
          this.getYuanBeansList()
        }
      },
      //元积分金额排行
      handleSizeChange_yuanPoint(val) {
        this.limit_yuanj = val;
        this.getYuanPointsList()
      },
      handleCurrentChange_yuanPoint(val) {
        this.page_yuanj = val;
        this.getYuanPointsList()
      },
      getYuanPointsList() {
        let data = {
          page_yuanj:this.page_yuanj,
          limit_yuanj:this.limit_yuanj,
        };
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/backstage/users/sortedbalance`,
          data: this.$querystring.stringify(data),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then(res => {
          this.yuanPointsList = res.data.yuanj;
          this.yuanPointTotal = res.data.countyuanj;
        })
        .catch(error => {
          this.yuanPointsList = [];
        });
      },
      //广告豆金额排行
      handleSizeChange_advBeans(val) {
        this.limit_yuand = val;
        this.getAdvBeansList()
      },
      handleCurrentChange_advBeans(val) {
        this.page_yuand = val;
        this.getAdvBeansList()
      },
      getAdvBeansList() {
        let data = {
          page_yuand:this.page_yuand,
          limit_yuand:this.limit_yuand,
        };
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/backstage/users/sortedbalance`,
          data: this.$querystring.stringify(data),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then(res => {
          this.advBeansList = res.data.yuand;
          this.advBeansTotal = res.data.countyuand;
        })
          .catch(error => {
            this.advBeansList = [];
          });
      },
      //元豆豆金额排行
      handleSizeChange_yuanBeans(val) {
        this.limit_ydd = val;
        this.getYuanBeansList()
      },
      handleCurrentChange_yuanBeans(val) {
        this.page_ydd = val;
        this.getYuanBeansList()
      },
      getYuanBeansList() {
        let data = {
          page_ydd:this.page_ydd,
          limit_ydd:this.limit_ydd,
        };
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/backstage/users/sortedbalance`,
          data: this.$querystring.stringify(data),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then(res => {
          this.yuanBeansList = res.data.ydd;
          this.yuanBeansTotal = res.data.countydd;
        })
          .catch(error => {
            this.yuanBeansList = [];
          });
      },
    },
  }
</script>

<style scoped lang="stylus">
  .accountRanking {
    .list_wrap{
      margin 0 auto
    }
  }
</style>
