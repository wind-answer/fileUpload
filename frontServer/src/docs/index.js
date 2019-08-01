import React from 'react';
import './index.css'
class Docs extends React.Component {
    render() {
        return (
            <div>
                <div className="docs-title">
                    <h1>常见问题</h1>
                </div>
                <br />
                <br />
                <div className="docs-content">
                    <h3>1、上传文件格式、大小限制</h3>
                    <div>
                        图片支持PNG、JPG、JPEG格式，3MB以下；文档格式不限由老师决定，3MB以下；视频支持MP4格式，50MB以下。
                    </div>
                    <br />
                    <h3>2、上传文件怎么算成功</h3>
                    <div>
                        文件上传成功或者失败，在相应的位置会有上传文件列表，绿色的代表成功，红色的代表失败，另外也可根据文件上传之后的消息提示。
                    </div>
                    <br />

                    <h3>3、怎么查看自己已经上传了哪些文件</h3>
                    <div>
                        点击浏览器刷新按钮或使用快捷键Ctrl+R刷新页面，相应的文件列表代表已经上传的文件，可以点击查看相应的文件，视频暂不支持预览。
                    </div>
                </div>
            </div>
        )
    }
}

export default Docs;
