<template>
    <div class="detail">
        <MHeader :back="true">详情页</MHeader>
    </div>
</template>

<script>
  import MHeader from '@/base/MHeader';
export default {
  data(){
    return {}
  },
  computed:{
    bid(){
      return this.$route.params.bid;
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
  }
</style>
