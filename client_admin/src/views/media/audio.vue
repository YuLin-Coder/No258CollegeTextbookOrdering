<template>
	<el-container class="page_media" id="media_audio">
		<el-main>
			<el-row>
				<el-col :xs="24" :sm="12" :lg="8">
					<div_audio :file="query.file"></div_audio>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
	import mixin from "@/mixins/page.js";
	import div_audio from "@/components/diy/div_audio.vue";

	export default {
		mixins: [mixin],
		components: {
			div_audio
		},
		data: function() {
			return {
				query: {
					file: "/media/audio.mp3"
				},
			}
		}
	}
</script>

<style>
</style>
