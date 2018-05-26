<template>
    <div>
      <MHeader>列表页</MHeader>
      <div class="content">
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
      </div>
    </div>
</template>

<script>
  import MHeader from '@/base/MHeader';
  import Loading from '@/base/Loading';
  import { getBooks,removeBook } from '@/api/index';
export default {
  data(){
    return {
      books:[],
      loading: true
    }
  },
  components:{
    MHeader,
    Loading
  },
  created(){
    this.getBook();
  },
  methods:{
    async getBook(){
      let { data: bookList } = await getBooks();
      this.books = bookList;
      this.loading = false;
    },
    async remove(id){
      await removeBook(id);
      this.books = this.books.filter(book=>book.bookId!=id);
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
</style>
