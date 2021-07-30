$(function () {
    // 从服务器中获取用户信息
    getUserInfo();

    var layer = layui.layer;
    $('#item-logout').on('click', function () {
        layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
            //移除本地存储中的token
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html';

            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            var data = res.data;
            renderUserInfo(data);
        }
    })
}
function renderUserInfo(user) {
    //    如果有昵称，就是用昵称，否则使用用户名
    var name = user.nickname || user.username;
    $('.font-username').html('欢迎&nbsp;&nbsp;' + name);
    // 渲染图片，如果设置了头像，就是用设置的，否则使用文字头像
    if (user.user_pic === null) {
        //渲染文字头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.font-avatar').html(first).show();

    } else {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.font-avatar').hide();
    }

}