<!-- 音频 -->
<template>
	<div class="div_audio">
		<audio :controls="showstrip" :loop="loop" class="audio">
			<source :src="file" :type="type">
			您的浏览器不支持 audio 元素。
		</audio>
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
				default: "audio/mpeg"
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
	.div_audio .audio {
		width: 100%;
	}
</style>
