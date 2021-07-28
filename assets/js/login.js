$(function () {
    // 点击注册链接
    $('#link_reg').on('click', function () {
        $('#login-box').hide();
        $('#reg-box').show();
    })
    // 点击登录链接
    $('#link_login').on('click', function () {
        $('#login-box').show();
        $('#reg-box').hide();
    })
    // 表单验证
    // 获取layui中的form对象
    var form = layui.form;
    // 获取layui中的layer对象
    var layer = layui.layer;
    // 调用verrify方法进行表单验证
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        // 自定义验证规则，设置好后需要添加到lay-verify属性中
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        psw: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //匹配两组密码是否一致
        repsw: function (value) {
            if ($('#reg-form [name=password]').val() !== value) {
                return '输入的两次密码不一致';
            }
        }
    })
    // 为注册表单绑定提交事件，将数据提交到服务器
    $('#reg-form').submit(function (e) {
        // 阻止默认提交事件
        e.preventDefault();
        let data = { username: $('#reg-form [name=username]').val(), password: $('#reg-form [name=password]').val() };
        $.post('/api/reguser', data, function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');
            // 注册成功后直接跳转到登录界面
            $('#link_login').click();
        })
    })
    // 为登录表单绑定事件
    $('#login-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 调用serialize方法获取表单值
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('请确认账号密码是否有误');
                }
                // 将登录成功获得的token字符串保存到localstorage中
                localStorage.setItem('token', res.token);

                layer.msg(res.message);
                // 跳转到index页面
                location.href = '/index.html';
            }
        })
    })
})