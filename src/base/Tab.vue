<template>
    <div class="footer">
        <router-link to="/home">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
        </router-link>
        <router-link to="/list">
            <i class="iconfont icon-icon--"></i>
            <span>列表</span>
        </router-link>
        <router-link to="/collect">
            <i class="iconfont icon-shoucang"></i>
            <span>收藏</span>
        </router-link>
        <router-link to="/add">
            <i class="iconfont icon-tianjia"></i>
            <span>添加</span>
        </router-link>
    </div>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="less">
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        display: flex;
        border-top: 1px solid #ccc;
        a {
            flex: 1;
            color: yellowgreen;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        a.router-link-active {
            color: red;
        }
    }
</style>
