<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carouselList,index) in list"
        :key="carouselList.id"
      >
        <img :src="carouselList.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ['list'],
  watch: {
    list: {
      //立即监听：不管数据是否变化，都会监听一次，正常监听无法监听得到
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true, //自动循环

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar"
            }
          });
        });
      }
    }
  }
};
</script>

<style>
</style>