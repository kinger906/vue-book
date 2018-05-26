<template>
    <div class="detail">
        <MHeader :back="true">详情页</MHeader>
        <ul>
          <li>
            <label for="bookInfo">书的名称</label>
            <input type="text" v-model="book.bookInfo" id="bookInfo"/>
          </li>
          <li>
            <label for="bookPrice">书的价格</label>
            <input type="text" v-model="book.bookPrice" id="bookPrice"/>
          </li>
          <li>
            <label for="bookCover">书的封面</label>
            <input type="text" v-model="book.bookCover" id="bookCover"/>
          </li>
        </ul>
        <button @click="update">确认修改</button>
    </div>
</template>

<script>
  import MHeader from '@/base/MHeader';
  import { getOneBook,updateBook } from '@/api/index';
export default {
  data(){
    return {
      book:{}
    }
  },
  computed:{
    bid(){
      return this.$route.params.bid;
    }
  },
  created(){
    this.getData();
  },
  watch:{
    $route(){
      this.getData();
    }
  },
  methods:{
    async getData(){
      let {data: oneBook} = await getOneBook(this.bid);
      this.book = oneBook;
      //如果是空对象，跳转到首页
      if(!Object.keys(this.book).length){
        this.$router.push('/list');
      }
    },
    async update(){
      await updateBook(this.bid,this.book);
      this.$router.push('/list');
    }
  },
  components:{
    MHeader
  }
}
</script>

<style scoped lang="less">
  .detail {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 100;

    ul {
      margin-top: 40px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      li {
        label {
          display: block;
        }
        input {
          height: 25px;
          line-height: 25px;
          width: 100%;
          margin: 10px auto;
        }
      }
    }
    button {
      width: 80px;
      height: 25px;
      border: none;
      border-radius: 15px;
      color: #fff;
      font-size: 14px;
      line-height: 25px;
      text-align: center;
      background: red;
      margin-left: 10px;
    }
  }
</style>
