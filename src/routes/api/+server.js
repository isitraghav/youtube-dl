import ytdl from '@distube/ytdl-core';
// import { json } from '@sveltejs/kit';

// export async function GET(params) {
//     let vid = params.url.searchParams.get('v')
//     await ytdl.getInfo(`http://www.youtube.com/watch?v=${vid}`).then(info => {
//         console.log(info.formats);
//     }).finally((info) => {
//         return json(info);


//     })
// }


import { json } from '@sveltejs/kit';

export async function GET(params) {
    let vid = params.url.searchParams.get('v')
    const info = await ytdl.getInfo(`http://www.youtube.com/watch?v=${vid}`)
    return json(info);
}
