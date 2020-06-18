<template>
    <!-- 主页 -->
    <section id="home">
        <div class="box-1">
            <h2 class="title">数据汇总</h2>
            <div class="datas">
                <!-- 当前在线 -->
                <div class="data1">
                    <div class="num">{{ currentUser }}</div>
                    <h2>当前在线用户</h2>
                </div>
                <!-- 全部用户 -->
                <div class="data2">
                    <div class="num">{{ allUser }}</div>
                    <h2>全部用户</h2>
                </div>
                <!-- <div class="data3"></div> -->
                <!-- <div class="data4"></div> -->
                <!-- <div class="data5"></div> -->
            </div>
        </div>
        <div class="charts">
            <!-- 柱形图 -->
            <div class="box-2"></div>
            <!-- 折线图 -->
            <div class="box-3"></div>
        </div>
    </section>    
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            currentUser: 0, // 当前在线用户
            allUser: 0,     // 全部用户
        }
    },
    watch: {
        currentUser: {
            handler (newVal, oldVal) {
                this.barChart();
                this.lineChart();
            },
            // deep: true,
            immediate: true
        },
        allUser: {
            handler(newVal, oldVal) {
                this.barChart();
                this.lineChart();
            },
            immediate: true
        }
    },
    mounted() {
        // 绘制图表
        setTimeout(() => {
            this.barChart();
            this.lineChart();
        }, 300);
    },
    created() {
        this.getData();
    },
    methods: {
        barChart() {
            // 柱状图
            let myChart1 = this.$echarts.init(document.querySelector(".charts .box-2"));
            let option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                title: {
                    text: '用户统计',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#333'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['当前在线', '全部用户'],
                        axisTick: {
                            alignWithLabel: true,
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        }
                    },

                ],
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: '15%',
                        data: [this.currentUser, this.allUser],
                        itemStyle: {
                            // 修改柱子圆角
                            barBorderRadius: 5
                        }
                    },
                ]
            };
            myChart1.setOption(option);
            window.addEventListener("resize", function() {
                myChart1.resize();
            });
        },
        lineChart() {
            // 柱状图2
            let myChart2 = this.$echarts.init(document.querySelector(".charts .box-3"));
            let option = {
                color: ['#3398DB'],
                title: {
                    text: '用户统计',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#333'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['当前在线', '全部用户']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    axisLabel: {
                        show: true  
                    },
                    axisTick: {
                        show: false
                    },
                    type: 'category',
                    data: ['当前在线', '全部用户']
                },
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: "20%",
                        data: [this.currentUser, this.allUser],
                        itemStyle: {
                            // 修改柱子圆角
                            barBorderRadius: 5
                        }
                    }
                ]
            };
            myChart2.setOption(option);
            window.addEventListener("resize", function() {
                myChart2.resize();
            });
        },
        getData() {
            // 获取当前在线用户
            this.$axios.post("/user/findBysession")
                .then(res => {
                    console.log(res);
                    this.currentUser = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
            // 获取全部用户 
            this.$axios.post("/user/findUserNumber")
                .then(res => {
                    console.log(res);
                    this.allUser = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>

<style lang="scss" scoped>
/* 声明字体*/
@font-face {
  font-family: electronicFont;
  src: url(../assets/font/DS-DIGIT.TTF);
}
    #home {
        width: 100%;
        height: 9rem;
        background:linear-gradient(-90deg,rgba(0,246,255,0.17),rgba(138,0,255,0.17));
        border-radius:14px;
        margin: .28rem  auto;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: .10rem;
        .box-1 {
            box-sizing: border-box;
            background: #fff;
            width: 99%;
            height: 3.05rem;
            margin: 0 auto;
            border-radius: .155rem;
            box-shadow: 0px 1px 1px 0px rgba(76,76,76,0.68);
            display: flex;
            flex-direction: column;
            padding: .125rem;
            .title {
                flex: 1;
                color: #333333;
                font-size: .19rem;
                text-align: left;
                margin-bottom: .1rem;
            }
            .datas {
                flex: 9;
                display: flex;
                div {
                    margin-right: .3rem;
                    flex: 1;
                    border-radius: .105rem;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    .num {
                        box-sizing: border-box;
                        width: 95%;
                        text-align: center;
                        margin: .1rem auto 0;
                        background:rgba(0,0,0,.4);
                        padding: .1rem .2rem;
                        border-radius:14px;
                        flex: 3;
                        font-size:.85rem;
                        font-family: electronicFont;
                        font-weight:normal;
                        color:#ffeb7b;
                        text-shadow:0px 1px 1px rgba(76,76,76,0.68);
                    }
                    h2 {
                        margin-top: .2rem;
                        flex: 3;
                        font-size: .35rem;
                        font-weight:normal;
                        color:rgba(255,255,255,1);
                        text-shadow:0px 1px 1px rgba(76,76,76,0.68);
                        text-align: center;
                    }
                }
                div:nth-child(2) {
                    margin-right: 0;
                }
                div.data1 {
                    // 当前在线用户
                    background:#79E8FA linear-gradient(-90deg,rgba(114,43,255,0.32),rgba(24,203,255,0.32));
                }
                div.data2 {
                    // 全部用户
                    background: #80A4DA linear-gradient(-90deg,rgba(114,43,255,0.32),rgba(24,203,255,0.32));
                }
                div.data3 {
                    background: #808BDA linear-gradient(-90deg,rgba(114,43,255,0.32),rgba(24,203,255,0.32));
                }
                div.data4 {
                    background: #906ECD linear-gradient(-90deg,rgba(114,43,255,0.32),rgba(24,203,255,0.32));
                }
                div.data5 {
                    background: #C34CE1 linear-gradient(-90deg,rgba(114,43,255,0.32),rgba(24,203,255,0.32));
                }
            }
        }
        .charts {
            width: 99%;
            display: flex;
            margin: .1475rem auto 0;
            .box-2 {
                box-sizing: border-box;
                background: #fff;
                flex: 1;
                height: 5.4rem;
                margin-right: .1675rem;
                box-shadow:0px 1px 1px 0px rgba(76,76,76,0.68);
                border-radius:14px;
            }
            .box-3 {
                box-sizing: border-box;
                background: #fff;
                flex: 1;
                height: 5.4rem;
                box-shadow:0px 1px 1px 0px rgba(76,76,76,0.68);
                border-radius:14px;
            }
        }

    }
</style>