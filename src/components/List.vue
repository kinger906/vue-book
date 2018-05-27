<template>
    <div>
      <MHeader>列表页</MHeader>
      <div class="content" @scroll="scroll" ref="scroll">
        <Loading v-if="loading"></Loading>
        <ul v-else>
          <router-link v-for="book in books" tag="li" :to="{ name:'detail',params:{ bid: book.bookId}}">
            <img :src="book.bookCover" alt="">
            <div>
              <h4>{{book.bookInfo}}</h4>
              <b>{{book.bookPrice}}</b>
              <button @click.stop="remove(book.bookId)">删除</button>
            </div>
          </router-link>
        </ul>
        <div v-show="showMore" class="showMore" @click="more">加载更多</div>
      </div>
    </div>
</template>

<script>
  import MHeader from '@/base/MHeader';
  import Loading from '@/base/Loading';
  import { getPageBook,removeBook } from '@/api/index';
export default {
  data(){
    return {
      books:[],
      loading: true,
      offset: 0,
      showMore: true
    }
  },
  components:{
    MHeader,
    Loading
  },
  created(){
    this.getBook();
  },
  mounted(){    //操作dom在挂载完毕的周期函数里加
    let scroll = this.$refs.scroll;
    let top = scroll.offsetTop;
    let start = 0;
    let distance = 0;
    let startHander = (e)=>{
      start = e.touches[0].pageY;
      scroll.addEventListener('touchmove',moveHander,false);
    }
    let moveHander = (e)=>{
        let end = e.touches[0].pageY;
        distance = end - start;
        if(distance>50){
          distance = 50;
        }
        scroll.style.top = distance + top + 'px';
        scroll.addEventListener('touchend',endHander,false);
    }
    let endHander = ()=>{
        scroll.removeEventListener('touchmove',moveHander);
        scroll.removeEventListener('touchend',endHander);
        this.refreshTimer = setInterval(()=>{
          if(distance == 0){
            clearInterval(this.refreshTimer);
            this.books = [];
            this.offset = 0;
            this.getBook();
          }
          else{
            distance-=1;
            scroll.style.top = distance + top + 'px';
          }
        },1)
    }
    scroll.addEventListener('touchstart',startHander,false)
  },
  methods:{
    async getBook(){
      let { data: bookObj } = await getPageBook(this.offset);
      let { books: bookList,showMore } = bookObj;
      this.books = this.books.concat(bookList);
      this.showMore = showMore;
      this.offset = this.books.length;
      this.loading = false;
    },
    async remove(id){
      await removeBook(id);
      this.books = this.books.filter(book=>book.bookId!=id);
    },
    more(){   //加载更多
      this.getBook();
    },
    scroll(){ //滚动加载
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{ //this.timer挂载到当前实例，成为全局变量
        let { clientHeight,scrollTop,scrollHeight } = this.$refs.scroll;
        if((scrollTop+clientHeight+20)>scrollHeight){
          this.getBook();
        }
      },13)
    }
  }
}
</script>

<style scoped lang="less">
  ul {
    padding: 10px;
    li {
      display: flex;
      width: 100%;
      margin: 10px 0;
      img { width: 50%;}
      div {
        padding: 10px 0;
        b { color: red; padding-top: 10px; display: inline-block;}
        button {
          display: block;
          width: 80px;
          height: 25px;
          border: none;
          background: red;
          color: #fff;
          border-radius: 10px;
          margin-top: 10px;
          outline: none;
        }
      }
    }
  }
  .showMore {
    width: 100%;
    height: 20px;
    background: #0f0;
    color: #fff;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
  }
</style>
