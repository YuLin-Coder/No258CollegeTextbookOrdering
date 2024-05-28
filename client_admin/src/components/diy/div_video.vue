<!-- 视频 -->
<template>
	<div class="div_video">
		<video :controls="showstrip" :loop="loop" class="video">
			<source :src="file" :type="type">
			您的浏览器不支持 video 属性。
		</video>
	</div>
</template>

<script>
	import mixin from "@/mixins/component.js";
	export default {
		mixins: [mixin],
		props: {
			file: {
				type: String,
				required: true
			},
			type: {
				type: String,
				default: "video/mp4"
			},
			showstrip: {
				type: Boolean,
				default: true
			},
			loop: {
				type: Boolean,
				default: false
			},
		},
		data: function() {
			return {

			}
		},
		methods: {

		},
		created() {

		}
	}
</script>

<style>
	.div_video .video {
		width: 100%;
	}
</style>
