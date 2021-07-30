$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 验证表单
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        pwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '不能和新密码相同'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd').val()) {
                return '两次密码不一致！'
            }
        }
    })
    $('#repwd-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('#repwd-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('更改密码成功');
                // 重置表单
                $('.layui-form')[0].reset();
            }
        })
    })
})