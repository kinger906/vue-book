<template>
    <div>
        <MHeader>新增图书</MHeader>
        <div class="content">
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
            <button @click="add">新增图书</button>
        </div>
    </div>
</template>

<script>
import { addBook } from '@/api/index';
import MHeader from '@/base/MHeader';
export default {
   data(){
       return { book: {}}
   },
   components:{
       MHeader
   },
   methods:{
       async add(){
           await addBook(this.book);
           this.$router.push('/list');
       }
   }
}
</script>

<style scoped lang="less">
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
</style>
