$(function () {
    var layer = layui.layer;
    var form = layui.form;
    // 验证表单
    form.verify({
        name: function (value) {
            if (value.length > 6) {
                return '昵称不能大于六个字符';
            }
        }
    })
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('请求用户信息失败');
                }
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 重置按钮
    $('#reuserInfo').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
    $('#reuser-info').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('#reuser-info').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败');
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        })
    })
})
