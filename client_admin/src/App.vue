<template>
	<div class="app" id="app">
		<div class="page" v-if="$store.state.user.user_id === 0 || url.indexOf($route.path) !== -1 ">
			<router-view />
		</div>
		<div class="page" v-else>
			<!-- 侧边栏 -->
			<page_side :isCollapse="isCollapse"></page_side>
			<!-- 主体 -->
			<main>
				<!-- 页头 -->
				<page_header v-model="isCollapse" />
				<article>
					<router-view />
				</article>
			</main>
		</div>
	</div>
</template>

<style>
	@import "/css/base.css";
	@import "/css/theme.css";

	.mr-1 {
		margin-right: 1rem;
	}

	.quill-editor {
		background: #FFFFFF;
	}

	.ql-editor {
		min-height: 25rem;
	}

	.editor {
		min-height: 500px;
	}

	.el-dialog {
		width: calc(100% - 1rem);
		max-width: 40rem;
	}

	.field_action {
		text-align: center;
	}

	.field_action .el-transfer {
		display: inline-block;
		text-align: left;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	input[type=number] {

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}

		-moz-appearance: textfield;
	}

	@media (min-width: 576px) {
		::-webkit-scrollbar-track-piece {
			background-color: #f8f8f8;
		}

		/* 滚动条的宽度 */
		::-webkit-scrollbar {
			width: .5rem;
			height: .5rem;
		}

		/* 滚动条的设置 */
		::-webkit-scrollbar-thumb {
			background-color: rgba(0, 0, 0, 0.5);
			background-clip: padding-box;
			min-height: 1rem;
			border-radius: 0.5rem;
		}
	}

	.avatar-uploader .el-upload-dragger {
		width: 178px;
	}

	table a {
		color: inherit;
		text-decoration: none;
	}

	.el-input {
		max-width: 22.625rem;
	}

	body {
		padding: 0;
		margin: 0;
		background-color: #efeff4;
	}

	main {
		margin: 0 auto;
		overflow-x: hidden;
		width: 100%;
	}


	header i {
		font-size: 1.75rem;
	}

	article {
		box-sizing: border-box;
		height: calc(100vh - 3.375rem);
		padding: .5rem;
		overflow-y: auto;
	}

	button i::before {
		font-weight: bold;
	}

	.el-breadcrumb {
		padding: .5rem;
	}


	.page {
		display: flex;
		align-items: stretch;
	}

	.btn_full {
		width: 100%;
	}

	.el-table .cell {
		white-space: nowrap;
	}

	.ql-editor {
		height: 300px;
	}

	.diy_panel .el-radio {
		padding: 9px 15px 9px 15px;
	}

	.diy_panel .el-checkbox {
		padding: 9px 15px 9px 15px;
	}

	.bg {
		background: white;
	}

	.form.p_4 {
		padding: 1rem;
	}

	.form .el-input {
		width: initial;
	}

	.mt {
		margin-top: 1rem;
	}

	.float-right {
		float: right;
	}

	.mr-1 {
		margin-right: 1rem;
	}

	.el-table .table_class {
		background: rgba(150, 150, 150, 0.1);
		text-align: center;
	}

	.text_center {
		text-align: center;
	}

	.float-right {
		float: right;
	}

	.warp {
		width: 100%;
	}

	.el-col {
		overflow: hidden;
	}

	.ql-picker {
		height: initial !important;
	}
	
	@import "/css/diy.css";
	
</style>

<script>
	export default {
		data() {
			return {
				isCollapse: false,
				url: ['/login', '/forgot', '/register']
			}
		},
		methods: {
			init() {
				var token = $.db.get('token');
				if (token) {
					this.$store.commit('user_set', {
						token
					});
				}
			}
		},
		created() {
			this.init();
		}
	}
</script>
