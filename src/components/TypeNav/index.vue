<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow">
            <h2 class="all" @mouseenter="enterShow" >全部商品分类</h2>
            <!-- 鼠标移除事件 -->
            <div @mouseleave="leaveIndex">
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <!-- 三级联动 -->
                <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cru:currentIndex == index}">
                            <h3 @mouseenter="changeIndex(index)" >
                                <a  :data-categoryName = c1.categoryName :data-category1Id = c1.categoryId>{{c1.categoryName}}</a>
                            </h3>
                            <!-- 二、三级分类 -->
                            <div class="item-list clearfix" :style="{display : currentIndex == index?'block':'none'}">
                            <!-- <div class="item-list clearfix"> -->
                                <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName = c2.categoryName :data-category2Id = c2.categoryId>{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em  v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName = c3.categoryName :data-category3Id = c3.categoryId>{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
//按需引入ladash库，实现节流
import throttle from "lodash/throttle"

export default {
    name: 'TypeNav',
    data(){
        return{
            currentIndex: -1,
            show: true
        }
    },
    // 组件挂载完毕，可以向服务器发送请求
    mounted(){
        //通知vuex发送请求，获取数据，储存于仓库中。
        // this.$store.dispatch('categoryList')

        //当组件挂载完毕，如果不是Home路由组件，让shou属性改为false将typeNav隐藏
        if(this.$route.path!='/home'){
            this.show = false
        }
    },

    computed: {
        ...mapState({
            //右侧需要的是一个函数，当使用这个计算属性时，函数会立即执行一次
            //注入一个参数state，其实即为大仓库中的数据
            categoryList: (state) => {
                // console.log(state)   
                return state.home.categoryList
            }
        })
    },
    methods: {
        //鼠标移入元素获取当前元素的index值
        // changeIndex(index){
        //     this.currentIndex = index
        //     // console.log(this.currentIndex)
        // },

        // 采用节流操作
        changeIndex: throttle(function(index){
            this.currentIndex = index
        },50),

        // 一级分类鼠标移除回调函数
        leaveIndex(){
            this.currentIndex = -1
            // console.log(this.currentIndex)
        },
        // 点击a标签跳转Search组件
        goSearch(event){
            //利用编程式导航+事件委派的方案，实现路由跳转，
            //给a标签加上自定义属性 data-categoryName,获取触发这个事件的节点，带有data-categoryName 属性的一定是a标签，实现跳转
            let element = event.target
            //节点有一个属性 dataset，可以获取节点的自定义属性和属性值。
            // console.log(element.dataset)
           let {categoryname,category1id,category2id,category3id} = element.dataset
            // console.log(element.dataset)
            if(categoryname){
                let location = {name: 'search'}
                let query = {categoryName: categoryname}
                if(category1id){
                    query.category1Id = category1id
                }else if (category2id){
                    query.category2Id = category2id
                }else {
                    query.category3Id = category3id
                }
                //整理参数
                //如果路由跳转时带有params参数，把其带上传递过去
                //路由跳转
                if(this.$route.params){
                    location.params = this.$route.params
                    location.query = query
                    this.$router.push(location)
                }
            }

        },
        //跳转到search页面时通过鼠标进入与否来展示内容
        enterShow(){
            if(this.$route.path!= '/home'){
                this.show = true 
            }
        },
        leaveShow(){
             if(this.$route.path!= '/home'){
                this.show = false 
            }
        }
    }
}
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                position: relative;
                top: -32px;
                margin-left: 200px;
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        cursor: pointer;
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;
                                    a {
                                        cursor: pointer;
                                    }

                                    &.fore {
                                        border-top: 0;
                                    }

                                   

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                        // 已用js实现是否展示二三级分类的内容
                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                  .cru {
                        background: skyblue;
                    }
                }
                  
            }
        }
    }
</style>