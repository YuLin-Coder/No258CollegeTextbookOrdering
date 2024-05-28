<template>
    <div id="app">
        <page_header/>
        <div class="space"/>
        <transition name="fade-transform" mode="out-in">
            <router-view :key="$route.fullPath"/>
        </transition>
        <page_footer/>
    </div>
</template>

<style lang='less'>
    @import "/css/base.css";
    @import "/css/theme.css";

    .page-item.active .page-link {
        background-color: var(--color_primary) !important;
        border-color: var(--color_primary) !important;
    }

    .btn-outline-primary {
        color: var(--color_primary) !important;
        border-color: var(--color_primary) !important;
    }

    //放大镜
    .mouse-cover-canvas {
        position: absolute;
        left: calc(50% - 6rem) !important;
        top: 8rem !important;
    }

    body {
        background-color: #F4F7F9 !important;
        font-family: STXihei !important;
    }

    [class="col-"] {
        padding: 0;
    }

    .space {
        height: 5rem;
    }

    .page_header {
        position: fixed;
        top: 0;
        z-index: 1000;
        width: 100%;
    }

    a {
        color: inherit !important;
        text-decoration: none;
        -webkit-transition: all 0.3s ease 0s;
        -o-transition: all 0.3s ease 0s;
        transition: all 0.3s ease 0s;
    }

    a:hover {
        text-decoration: none !important;
        /*color: var(--color_primary) !important;*/
        color: #909399 !important;
    }

    .toast {
        opacity: 1 !important;
        min-width: 200px;
    }

    .b-toaster-top-right {
        position: absolute;
        top: 10rem;
        left: 50%;
        transform: translate(-50%);
    }

    figure,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ul,
    li {
        margin: 0;
        padding: 0;
    }

    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all 0.5s;
    }

    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-30px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
	
	@import "/css/diy.css";
</style>
