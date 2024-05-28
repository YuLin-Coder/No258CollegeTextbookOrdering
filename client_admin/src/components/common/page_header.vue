<template>
	<header>
		<div class="warp">
			<el-row>
				<el-col :span="24">
					<div class="action_left">
						<a class="btn_menu" href="javascript:void(0)" @click="$emit('change', !isCollapse)">
							<i :class="{'el-icon-menu' : !isCollapse,  'el-icon-s-grid': isCollapse }"></i>
						</a>
					</div>
          <div class="action_center">欢迎使用教材订购系统</div>
					<div class="action_right">
						<el-dropdown @command="handleCommand">
							<div class="el-dropdown-link" style="margin-right: 2rem;">
								<el-avatar style="margin-top: 0.25rem; width: 2.3rem; overflow: hidden;"
									:src="$fullUrl(user.avatar)">
									<img style="width: 2.3rem; overflow: hidden" src="/img/error.png" />
								</el-avatar>
								<span style="margin-left: 0.5rem; position: relative;top: -0.75rem;">{{ user.nickname || user.username }}</span>
							</div>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="/user/info">个人信息</el-dropdown-item>
								<el-dropdown-item command="/user/password">修改密码</el-dropdown-item>
								<el-dropdown-item command="http://localhost:8081/">网站首页</el-dropdown-item>
								<el-dropdown-item command="/quit" divided>退出</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>

				</el-col>
			</el-row>
		</div>
	</header>
</template>


<script>
	export default {
		model: {
			event: 'change',
			prop: 'isCollapse'
		},
		props: {
			isCollapse: {
				trye: Boolean,
				default: true
			}
		},
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				user: this.$store.state.user,
				search: ""
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			handleCommand(command) {
				if (command === "/quit") {
					this.$get("~/api/user/quit",{},(res)=>{
						this.$store.commit("quit");
						this.$router.push("/login");
					});
				} else if(command.indexOf("http")!==-1){
					let token = $.db.get("token");
					if (token){
						location.href = command+"?token="+token;
					}
				} else {
					this.$router.push(command);
				}
			}
		}
	}
</script>

<style scoped="scoped">
	header {
		background-color: rgb(84, 92, 100);
		border-bottom: var(--color_border);
		color: #fff;
	}

  .action_left {
    float: left;
    width: 30%;
  }

  .action_center {
    float: left;
    line-height: 51px;
    width: 40%;
    text-align: center;
  }

  .action_right {
    text-align: right;
    float: right;
    width: 30%;
  }

	.el-dropdown {
		color: #fff;
	}

	.btn_menu {
		display: inline-block;
		padding: 0.625rem;
	}
</style>
