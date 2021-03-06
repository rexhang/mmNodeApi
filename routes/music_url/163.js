const { formatMusicUrl } = require('../../model/index.js');
const config = require('../../config/index.js');
const { Tips, OK_163 } = require('../../util/index.js');

// 歌曲 URL 网易

module.exports = async (ctx, next, axios) => {
    const { format: ft = config.format } = ctx.query;
    const ids = [ctx.request.body.id];
    const params = {
        ids,
        br: 999000,
        csrf_token: ''
    };
    await axios('/weapi/song/enhance/player/url', 'post', params)
        .then(res => {
            if (res.code === OK_163) {
                const data = ft === 'open' ? formatMusicUrl(res.data, '163') : res.data;
                ctx.body = {
                    data,
                    ...Tips[163]
                };
            } else {
                ctx.body = res;
            }
        })
        .catch(() => ctx.throw(500));
};
