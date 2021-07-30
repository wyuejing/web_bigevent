$(function () {
    // 1.1 获取裁剪区域的 DOM 元素 
    var $image = $('#image');
    // 1.2 配置选项 
    const options = {
        // 纵横比 
        aspectRatio: 1,
        // 指定预览区域 
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域 
    $image.cropper(options);

    // 2、绑定点击事件
    $('.select-avatar').on('click', function () {
        // 在点击选择图片时，让input表单调用click（）方法
        $('#avatar-upload').click();
    })
    // 2.1、监听input状态
    $('#avatar-upload').on('change', function (e) {
        // 当选中图片后，会返回一个事件对象,里面有一个fileList
        // 获取用户选择的文件
        console.log(e);
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0];
        //根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(file);
        //先 销毁 旧的裁剪区域，再 重新设置图片路径 ，之后再 创建新的裁剪区域
        $image.cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 点击上传头像时，发起Ajax请求
    $('.upload-avatar').on('click', function () {
        var dataURL = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布 
            width: 100,
            height: 100
        }).toDataURL('image/png');
        // 将 Canvas 画布上的内容，转化为 base64 格式的字符 串
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },//新头像，base64格式的字符串
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('上传头像失败')
                }
                layui.layer.msg('上传头像成功');
                window.parent.getUserInfo();
            }
        })
    })
})