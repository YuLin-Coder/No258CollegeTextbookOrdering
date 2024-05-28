<template>
	<el-menu class="side el-menu-vertical-demo" default-active="/" @open="handleOpen" @close="handleClose"
		background-color="#545c64" text-color="#fff" active-text-color="#38f" :collapse="isCollapse" :router="true">
		<el-menu-item index="/">
			<i class="el-icon-s-home"></i>
			<span slot="title">首页</span>
		</el-menu-item>
		<el-submenu index="web"
			v-show="user_group == '管理员' || $check_group(['/nav/table','/link/table','/notice/table','/slides/table','/ad/table','/message/table'])">
			<template slot="title"><i class="el-icon-data-board"></i><span>站点管理</span></template>
			<!-- <el-menu-item v-show="user_group == '管理员' || $check_action('/auth/table')" index="/auth/table">
				<span>权限管理</span>
			</el-menu-item> -->
			<!-- <el-menu-item v-show="user_group == '管理员' || $check_action('/link/table')" index="/link/table">
				<span>友情链接</span>
			</el-menu-item> -->
			<el-menu-item v-show="user_group == '管理员' || $check_action('/slides/table')" index="/slides/table">
				<span>轮播图</span>
			</el-menu-item>
			<!-- <el-menu-item v-show="user_group == '管理员' || $check_action('/ad/table')" index="/ad/table">
				<span>广告</span>
			</el-menu-item> -->
			<el-menu-item v-show="user_group == '管理员' || $check_action('/notice/table')" index="/notice/table">
				<span>公告栏</span>
			</el-menu-item>
		</el-submenu>

		<el-submenu index="user"
			v-show="user_group == '管理员' || $check_group(['/user/table','/user_group/table','/auth/table'
			,'/teacher_user/table'
			,'/issuer/table'
			,'/purchasing_personnel/table'
			])">
			<template slot="title"><i class="el-icon-user-solid"></i><span>用户管理</span></template>
			<el-menu-item index="/user/table" v-show="user_group == '管理员'"><span>管理员</span></el-menu-item>
			<el-menu-item index="/teacher_user/table" v-show="user_group == '管理员' || $check_action('/teacher_user/table')"><span>教师用户</span></el-menu-item>
			<el-menu-item index="/issuer/table" v-show="user_group == '管理员' || $check_action('/issuer/table')"><span>发行人员</span></el-menu-item>
			<el-menu-item index="/purchasing_personnel/table" v-show="user_group == '管理员' || $check_action('/purchasing_personnel/table')"><span>采购人员</span></el-menu-item>
			<!-- <el-menu-item index="/user_group/table"><span>用户组</span></el-menu-item> -->
		</el-submenu>
		<el-submenu index="content"
			v-show="$check_group([ '/article/table','/article_type/table','/exam/table'])">
			<template slot="title"><i class="el-icon-chat-line-round"></i><span>内容管理</span></template>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/article/table')" index="/article/table">
				<!-- <span>文章</span> -->
				<span>{{$page_title("/article/table") || "文章"}}</span>
			</el-menu-item>
			<el-menu-item v-show="user_group == '管理员' || $check_action('/article_type/table')"
				index="/article_type/table">
				<!-- <span>文章类型</span> -->
				<span>{{$page_title("/article_type/table") || "文章分类"}}</span>
			</el-menu-item>
		</el-submenu>

		<el-submenu index="more" v-show="auth.length">
			<template slot="title"><i class="el-icon-copy-document"></i><span>更多管理</span></template>
			<el-menu-item v-for="(o, idx) in auth" v-show="$check_action(o.path)" :index="o.path">
				<span>{{o.page_title}}</span>
			</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	export default {
		props: {
			isCollapse: {
				trye: Boolean,
				default: false
			}
		},
		data: function() {
			return {
				user_group: this.$store.state.user.user_group
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				// console.log(key, keyPath);
			},

			handleClose(key, keyPath) {
				// console.log(key, keyPath);
			},

		},
		computed: {
			auth() {
				var tables = this.$store.state.web.auth;
				var lt = [];
				for (var i = 0; i < tables.length; i++) {
					var o = tables[i];
					if (o.path.indexOf("/table") !== -1) {
						let list = ["exam","article", "article_type",,"comment"];
						list.push("teacher_user");
						list.push("issuer");
						list.push("purchasing_personnel");
						if (list.indexOf(o.table_name) === -1) {
							lt.push(o);
						}
					}
				}
				return lt;
			}
		}
	}
</script>


<style scoped="scoped">
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 16rem;
	}

	.side {
		float: left;
		background: #545c64;
		color: #fff;
		overflow-y: scroll;
		height: 100vh;
	}
	.side::-webkit-scrollbar{
		display: none;
	}
</style>
