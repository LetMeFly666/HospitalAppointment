'''
Author: LetMeFly
Date: 2024-01-19 21:29:52
LastEditors: LetMeFly
LastEditTime: 2024-01-19 21:35:58
'''
from django.http import HttpResponse
from functools import wraps
import Secrets

def checkAdminAuth(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # 检查 cookie
        cookieLetHA = request.COOKIES.get('LetHA')
        print(cookieLetHA)
        if cookieLetHA == Secrets.ADMIN_PASSWORD:
            return view_func(request, *args, **kwargs)
        else:
            # 返回一个包含 JavaScript 的 HTML 响应
            return HttpResponse("""
            <html><body>
            <script>
                var password = prompt("请输入密码:");
                if (password != null) {
                    document.cookie = "LetHA=" + password + ";max-age=" + 60*60*24*365*100;
                    location.reload();
                }
            </script>
            </body></html>
            """)
    return _wrapped_view
