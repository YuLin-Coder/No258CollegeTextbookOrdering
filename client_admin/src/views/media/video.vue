<template>
	<el-container class="page_media" id="media_video">
		<el-main>
			<el-row>
				<el-col :xs="24" :sm="12" :lg="8">
					<div_video :file="query.file"></div_video>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
	import mixin from "@/mixins/page.js";
	import div_video from "@/components/diy/div_video.vue";

	export default {
		mixins: [mixin],
		components: {
			div_video
		},
		data: function() {
			return {
				query: {
					file: "/media/video.mp4"
				},
			}
		}
	}
</script>

<style>
</style>
