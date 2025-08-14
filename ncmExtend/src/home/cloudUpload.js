import { createBigButton, showTips } from "../utils/common"
import { Uploader } from "./Uploader"

const baseCDNURL = 'https://gq9ykm.github.io/myuserscriptsjson/'

let optionMap = {}

export const cloudUpload = async (uiArea) => {
    //云盘快速上传
    let btnUpload = createBigButton('快速上传加载中', uiArea, 2)
    let btnUploadDesc = btnUpload.firstChild
    let toplist = []
    let selectOptions = {}

    const category = await fetch(`${baseCDNURL}category.json`)
        .then(r => r.json())

    category.forEach(item => {
        optionMap[item.value] = item.label
        selectOptions[item.label] = {}
    })

    let artistmap = {}
    fetch(`${baseCDNURL}top.json`)
        .then(r => r.json())
        .then(r => {
            toplist = r;
            toplist.forEach(artist => {
                selectOptions[optionMap[artist.categroy]][artist.id] = `${artist.name}(${artist.count}首/${artist.sizeDesc})`
                artistmap[artist.id] = artist
            })
            //console.log(selectOptions)
            btnUpload.addEventListener('click', ShowCloudUploadPopUp)
            btnUploadDesc.innerHTML = '云盘快速上传'
        })
    function ShowCloudUploadPopUp() {
        Swal.fire({
            title: '快速上传',
            input: 'select',
            inputOptions: selectOptions,
            inputPlaceholder: '选择歌手',
            confirmButtonText: '下一步',
            showCloseButton: true,
            footer: '<div>由于网易云增加限制，目前周杰伦等无版权歌曲已经无法关联封面歌词。</div><div>建议先设置好请求头，以避免上传失败。</div><div><a href="https://github.com/Cinvin/myuserscripts/issues"  target="_blank">问题反馈</a></div>',
            inputValidator: (value) => {
                if (!value) {
                    return '请选择歌手'
                }
            },
        })
            .then(result => {
                if (result.isConfirmed) {
                    fetchCDNConfig(result.value)
                }
            })
    }
    function fetchCDNConfig(artistId) {
        showTips(`正在获取资源配置...`, 1)
        fetch(`${baseCDNURL}${artistId}.json`)
            .then(r => r.json())
            .then(r => {
                let uploader = new Uploader(r, true)
                uploader.start()
            })
            .catch(`获取资源配置失败`)
    }
}