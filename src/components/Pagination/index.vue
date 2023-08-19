<template>
  <div class="pagination">
    <button :disabled="pageNo== k1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',pageNo)" :class="{active: pageNo == 1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- <button v-for="(item, index) in continues " :key="index">{{StartNumAndEndNum.start++}}</button> -->
    <button :class="{active: pageNo == page}" v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start" @click="$emit('getPageNo',page)">{{page}}</button>
    
    <button v-show="startNumAndEndNum.end < totalPage-1" >···</button>
    <button v-show="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active: pageNo == totalPage}">{{totalPage}}</button>
    <button :disabled='pageNo == totalPage' @click="$emit('getPageNo',pageNo +1)">下一页</button>

    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ['pageNo','pageSize','total','continues'],
    computed: {
      //总共分多少页
      totalPage(){
        return Math.ceil(this.total/this.pageSize) 
      },
      //计算出连续页码的起始数字和结束数据
      startNumAndEndNum(){
         const {continues,totalPage,pageNo} = this //解构
         let start = 0 , end = 0
         //不正常分页 连续页码的数大于总的页数
         if(continues > totalPage){
           start = 1
           end = totalPage
         }else{
           //正常分页，连续页码在总页数之内
           start = pageNo - parseInt(continues/2) //parseInt()取整
           end = pageNo + parseInt(continues/2)
           if(start < 1){
            //  避免当pageNo = 1时，计算出的start时存在负数或者时0
             start =1
             end = continues
           }
           // 避免当pageNo是最后两页时，end会大于计算出来的总页数
           if(end > totalPage){
             end = totalPage
             start = totalPage-continues+1
           }
         }
         return {start,end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
    background-color: springgreen;
  }
</style>
