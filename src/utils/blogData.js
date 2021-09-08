export default [{
    "code": 0,
    "msg": "",
    "data": {
        "id": "608cc9903cddc5584a708c46",
        "title": "vue响应式原理", // 文章标题
        "description": "vue通过Object.defineProperty，将对象的属性变成getter和setter，当运行getter时记录依赖，当运行setter时派发更新", // 文章简介
        "createDate": 1619941606475, // 发布日期 时间戳
        "scanNumber": 10, // 浏览次数
        "commentNumber": 10, // 评论量
        "category":{ // 分类信息
            "id": "60852e6c3587f282fd5c5e80",
            "name": "vue"
        },
        "toc": [  // 目录
                    { "name": "章节1", "anchor": "title-1" },
                    { "name": "章节2", "anchor": "title-2", 
                        "children": [
                            { "name": "章节2-1", "anchor": "title-2-1" },
                            { "name": "章节2-2", "anchor": "title-2-2" },
                        ]
                    }
                ],
        "htmlContent": "<p>...</p> <p>...</p> <code>...</code> <img src=\"...\" > ", // 正文
        "thumb": "/static/upload/2021-4-25-10-25-33-23-62de35.jpg" // 缩略图
    }
}]