{{#each rows}}
	<li class="page-li page-click-item">
        <div class="weui-flex layui-col-xs6">
            <span class="weui-flex__item">{{name}}</span>
        </div>
        <div class="weui-flex layui-col-xs6 right">
        	<button class="layui-btn layui-btn-xs tab-btn-mar-left-3 reName" title="重命名页面"><i class="fa fa-pencil-square-o"></i></button>
        	<button class="layui-btn layui-btn-xs tab-btn-mar-left-3 toUp" title="上移页面"><i class="fa fa-arrow-up"></i></button>
        	<button class="layui-btn layui-btn-xs tab-btn-mar-left-3 toDown" title="下移页面"><i class="fa fa-arrow-down"></i></button>
        	<button class="layui-btn layui-btn-xs tab-btn-mar-left-3 copyPage" title="复制页面"><i class="fa fa-files-o"></i></button>
            <button class="layui-btn layui-btn-xs tab-btn-mar-left-3 delPage" title="删除页面"><i class="fa fa-trash"></i></button>
        </div>
        <div class="layui-col-xs12">
            <div class="layui-col-xs6">
	            <span class="file-content">文件名：{{fileName}}</span>
	        </div>
	        <div class="layui-col-xs6">
	            <span class="file-content">导出路径：page/{{filePath}}</span>
	        </div>
        </div>
    </li>
{{/each}}