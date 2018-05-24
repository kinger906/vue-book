<template>
    <div>
        <MHeader :back="true">首页</MHeader>
        <div class="content">
            <Swiper :swiperSlides="sliders"></Swiper>
            <div class="container">
              <h3>热门图书</h3>
              <ul>
                <li v-for="(hot,index) in hotBooks" :key="index">
                  <img :src="hot.bookCover" alt="">
                  <b>{{hot.bookInfo}}</b>
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>

<script>
import MHeader from '@/base/MHeader'
import Swiper from '@/base/Swiper'
import { getSliders,getHotBooks } from "../api";

export default {
   data(){
       return {
         sliders:[],
         hotBooks:[]
       }
   },
   components:{
       MHeader,
       Swiper
   },
   created(){
      this.getSlider();
      this.getHot();
   },
   methods:{
     async getSlider(){
       let { data:sliders } = await getSliders();
       this.sliders = sliders;
     },
     async getHot(){
       let { data: books } = await getHotBooks();
       this.hotBooks = books;
     }
   }
}
</script>

<style scoped lang="less">
  .container {
    width: 98%;
    margin: 0 auto;
    h3 {
      margin-top: 10px;
    }
    ul{
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      li {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
