<script>
	import axios from 'axios';

	let link,
		loading = false,
		loadedcontent = false;
	let thumbnail,
		title,
		videoUrl = [];
	async function download() {
		loading = true;
		if (!link.includes('youtube.com/watch?v=')) {
			loading = false
			alert('not a youtube url, copy it from the address bar')
			return
		}
		await axios
			.get('/api?v=' + link.split('watch?v=')[1].split('&')[0])
			.then((res) => {
				let data = res.data;
				thumbnail = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url;
				title = data.videoDetails.title;
				data.formats.forEach((vid) => {
					if (vid.hasAudio && vid.hasVideo) {
						videoUrl = [
							...videoUrl,
							{
								quality: vid.qualityLabel,
								url: vid.url
							}
						];
					}
				});
				console.log(data);
			})
			.finally(() => {
				loading = false;
				loadedcontent = true;
			});
	}
</script>

<div class="flex justify-center">
	<div class="flex flex-col gap-3 p-5 lg:p-24 bg-[#171717] rounded-xl">
		<div class="p-3 text-center sm:text-xl md:text-2xl font-inter">Youtube Downloader</div>
		<div class="">
			<div class="flex gap-3 justify-center items-center">
				<input
					bind:value={link}
					placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
					type="text"
					class="text-sm px-2 h-8 rounded bg-[#252525] text-white border border-[#353535]"
				/>
				<button
					on:click={download}
					class="p-2 rounded-lg border border-[#353535] bg-[#171717] flex justify-center items-center"
				>
					<i class="bx bx-search"></i>
				</button>
			</div>
		</div>
		<div>
			{#if loading}
				<div class="flex mt-5 justify-center items-center h-8 gap-3">
					<i class="bx bx-cog animate-spin"></i>
					<div>loading</div>
				</div>
			{:else if loadedcontent}
				<div class="border rounded-lg border-[#353535] bg-[#171717]">
					<img src={thumbnail} alt={title} class="rounded-md rounded-b-sm" />
					<div class="p-2 text-center">
						{title}
					</div>
					<div class="flex gap-2 justify-center">
						{#each videoUrl as vid}
							<a
								href={vid.url}
								download
								class="rounded-lg flex items-center gap-2 mb-3 border p-1 border-[#353535] bg-[#1b1b1b] uppercase text-sm"
							>
								{vid.quality}
								<i class="bx bx-save"></i>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
