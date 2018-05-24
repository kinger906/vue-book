<template>
    <div class="header">
        <slot></slot>
        <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
    </div>
</template>

<script>
export default {
   data(){
       return {}
   },
   props:{
       back:{
           type: Boolean,
           default: false
       }
   },
   methods:{
       goBack(){
           this.$router.go(-1);
       }
   }
}
</script>

<style scoped lang="less">
    .header {
        position: fixed;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #afd9ee;
        left: 0;
        top: 0;
        width: 100%;
        font-weight: bold;
        i {
            position: absolute;
            left: 10px;
        }
    }
</style>
