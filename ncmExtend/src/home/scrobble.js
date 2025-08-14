import { createBigButton } from "../utils/common"
import { weapiRequest } from "../utils/request"
import { showConfirmBox } from "../utils/common"
import { unsafeWindow } from "$"

export const scrobble = (uiArea) => {
    //btnListen.addEventListener('click', listenDaily)
    function listenDaily() {
        let begin = Math.floor(new Date().getTime() / 1000)
        let logs = []
        for (let i = begin; i < begin + 320; i++) {
            logs.push({
                action: 'play',
                json: {
                    type: 'song',
                    wifi: 0,
                    download: 0,
                    id: i,
                    time: Math.floor(Math.random() * 60) + 200,
                    end: 'playend',
                    source: 'user',
                    sourceId: String(unsafeWindow.GUser.userId),
                    mainsite: '1',
                    content: `id=${i}`,
                }
            })
        }
        weapiRequest('/api/feedback/weblog', {
            cookie: true,
            data: {
                logs: encodeURIComponent(JSON.stringify(logs))
            },
            onload: (res) => {
                //console.log(res1)
                if (res.code == 200) {
                    showConfirmBox('今日听歌量+300首完成')
                }
                else {
                    showConfirmBox('听歌量打卡失败。' + res)
                }
            }
        })
    }
}