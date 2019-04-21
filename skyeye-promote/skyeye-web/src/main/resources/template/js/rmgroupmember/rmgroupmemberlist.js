
var rowId = "";
layui.config({
	base: basePath, 
	version: skyeyeVersion
}).extend({  //指定 js 别名
	window: 'js/winui.window',
}).define(['window', 'table', 'jquery', 'winui', 'form', 'codemirror', 'xml', 'clike', 'css', 'htmlmixed', 'javascript', 'nginx',
           'solr', 'sql', 'vue'], function (exports) {
	
	winui.renderColor();
	
	var $ = layui.$,
	form = layui.form,
	table = layui.table;
	
	var editor = CodeMirror.fromTextArea(document.getElementById("modelContent"), {
        mode : "text/x-java",  // 模式
        theme : "eclipse",  // CSS样式选择
        indentUnit : 4,  // 缩进单位，默认2
        smartIndent : true,  // 是否智能缩进
        tabSize : 4,  // Tab缩进，默认4
        readOnly : true,  // 是否只读，默认false
        showCursorWhenSelecting : true,
        lineNumbers : true,  // 是否显示行号
        styleActiveLine: true, //line选择是是否加亮
        matchBrackets: true,
    });
	
	showGrid({
	 	id: "rmTypeId",
	 	url: reqBasePath + "common001",
	 	params: {},
	 	pagination: false,
	 	template: getFileContent('tpl/template/select-option.tpl'),
	 	ajaxSendLoadBefore: function(hdb){
	 	},
	 	ajaxSendAfter:function(json){
	 		//搜索表单
	 		form.render();
	 		form.on('select(selectParent)', function(data){
	 			showGrid({
	 	    	 	id: "rmGroupId",
	 	    	 	url: reqBasePath + "common002",
	 	    	 	params: {parentId: data.value},
	 	    	 	pagination: false,
	 	    	 	template: getFileContent('tpl/template/select-option.tpl'),
	 	    	 	ajaxSendLoadBefore: function(hdb){
	 	    	 	},
	 	    	 	ajaxSendAfter:function(json){
	 	    	 		form.render('select');
	 	    	 	}
	 	        });
	 		});
	 		form.on('submit(formSearch)', function (data) {
	 	    	//表单验证
	 	        if (winui.verifyForm(data.elem)) {
	 	        	loadTable();
	 	        }
	 	        return false;
	 		});
	 	}
    });
	
	//表格渲染
	table.render({
	    id: 'messageTable',
	    elem: '#messageTable',
	    method: 'post',
	    url: reqBasePath + 'rmxcx015',
	    where:{rmGroupId:$("#rmGroupId").val(), rmTypeId:$("#rmTypeId").val()},
	    even:true,  //隔行变色
	    page: true,
	    limits: [8, 16, 24, 32, 40, 48, 56],
	    limit: 8,
	    cols: [[
	        { title: '序号', type: 'numbers'},
	        { field: 'printsPicUrl', title: '效果图', width: 200, align: 'center', templet: function(d){
	        	return '<img src="' + fileBasePath + d.printsPicUrl + '" style="width:100%;height:auto" class="cursor" lay-event="printsPicUrl">';
	        }},
	        { field: 'id', title: 'HTML内容', width: 150, align: 'center', templet: function(d){
	        	return '<i class="fa fa-fw fa-html5 cursor" lay-event="htmlContent"></i>';
	        }},
	        { field: 'id', title: 'HTML-JS内容', width: 150, align: 'center', templet: function(d){
	        	if(!isNull(d.htmlJsContent)){
	        		return '<i class="fa fa-fw fa-html5 cursor" lay-event="htmlJsContent"></i>';
	        	}else{
	        		return '无';
	        	}
	        }},
	        { field: 'id', title: 'WXML内容', width: 150, align: 'center', templet: function(d){
	        	return '<i class="fa fa-fw fa-html5 cursor" lay-event="wxmlContent"></i>';
	        }},
	        { field: 'id', title: 'WXML-JS数据内容', width: 150, align: 'center', templet: function(d){
	        	if(!isNull(d.wxmlJsDataContent)){
	        		return '<i class="fa fa-fw fa-html5 cursor" lay-event="wxmlJsDataContent"></i>';
	        	}else{
	        		return '无';
	        	}
	        }},
	        { field: 'id', title: 'WXML-JS方法内容', width: 150, align: 'center', templet: function(d){
	        	if(!isNull(d.wxmlJsMethodContent)){
	        		return '<i class="fa fa-fw fa-html5 cursor" lay-event="wxmlJsMethodContent"></i>';
	        	}else{
	        		return '无';
	        	}
	        }},
	        { field: 'id', title: 'WXML-JS初始化方法内容', width: 150, align: 'center', templet: function(d){
	        	if(!isNull(d.wxmlJsMethodCreateContent)){
	        		return '<i class="fa fa-fw fa-html5 cursor" lay-event="wxmlJsMethodCreateContent"></i>';
	        	}else{
	        		return '无';
	        	}
	        }},
	        { field: 'typeName', title: '所属分类', width: 120 },
	        { field: 'groupName', title: '所属分组', width: 120 },
	        { field: 'memberUseNum', title: '使用次数', width: 120 },
	        { field: 'propertyNum', title: '标签属性数量', width: 120 },
	        { field: 'createTime', title: '创建时间', width: 180 },
	        { title: '操作', fixed: 'right', align: 'center', width: 300, toolbar: '#tableBar'}
	    ]]
	});
	
	table.on('tool(messageTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        if (layEvent === 'del') { //删除
        	del(data, obj);
        }else if (layEvent === 'edit') { //编辑
        	edit(data);
        }else if (layEvent === 'bindProperty') { //绑定属性
        	bindProperty(data);
        }else if (layEvent === 'top') { //上移
        	topOne(data);
        }else if (layEvent === 'lower') { //下移
        	lowerOne(data);
        }else if (layEvent === 'htmlContent') { //HTML内容
        	var mode = returnModel('html');
        	if (!isNull(mode.length)) {
				editor.setOption('mode', mode)
			} 
        	editor.setValue(data.htmlContent);
        	layer.open({
	            id: 'HTML内容',
	            type: 1,
	            title: 'HTML内容',
	            shade: 0.3,
	            area: ['1200px', '600px'],
	            content: $("#modelContentDiv").html(),
	        });
        }else if (layEvent === 'htmlJsContent') { //HTML-JS内容
        	var mode = returnModel('javascript');
        	if (!isNull(mode.length)) {
				editor.setOption('mode', mode)
			} 
        	editor.setValue(data.htmlJsContent);
        	layer.open({
	            id: 'HTML-JS内容',
	            type: 1,
	            title: 'HTML-JS内容',
	            shade: 0.3,
	            area: ['1200px', '600px'],
	            content: $("#modelContentDiv").html(),
	        });
        }else if (layEvent === 'wxmlContent') { //WXML内容
        	var mode = returnModel('html');
        	if (!isNull(mode.length)) {
				editor.setOption('mode', mode)
			} 
        	editor.setValue(data.wxmlContent);
        	layer.open({
	            id: 'WXML内容',
	            type: 1,
	            title: 'WXML内容',
	            shade: 0.3,
	            area: ['1200px', '600px'],
	            content: $("#modelContentDiv").html(),
	        });
        }else if (layEvent === 'wxmlJsDataContent') { //WXML-JS数据内容
        	var mode = returnModel('javascript');
        	if (!isNull(mode.length)) {
				editor.setOption('mode', mode)
			} 
        	editor.setValue(data.wxmlJsDataContent);
        	layer.open({
	            id: 'WXML-JS数据内容',
	            type: 1,
	            title: 'WXML-JS数据内容',
	            shade: 0.3,
	            area: ['1200px', '600px'],
	            content: $("#modelContentDiv").html(),
	        });
        }else if (layEvent === 'wxmlJsMethodContent') { //WXML-JS方法内容
        	var mode = returnModel('javascript');
        	if (!isNull(mode.length)) {
				editor.setOption('mode', mode)
			} 
        	editor.setValue(data.wxmlJsMethodContent);
        	layer.open({
	            id: 'WXML-JS方法内容',
	            type: 1,
	            title: 'WXML-JS方法内容',
	            shade: 0.3,
	            area: ['1200px', '600px'],
	            content: $("#modelContentDiv").html(),
	        });
        }else if (layEvent === 'wxmlJsMethodCreateContent') { //WXML-JS初始化方法内容
        	var mode = returnModel('javascript');
        	if (!isNull(mode.length)) {
				editor.setOption('mode', mode)
			} 
        	editor.setValue(data.wxmlJsMethodCreateContent);
        	layer.open({
	            id: 'WXML-JS初始化方法内容',
	            type: 1,
	            title: 'WXML-JS初始化方法内容',
	            shade: 0.3,
	            area: ['1200px', '600px'],
	            content: $("#modelContentDiv").html(),
	        });
        }else if (layEvent === 'printsPicUrl') { //图片预览
        	layer.open({
        		type:1,
        		title:false,
        		closeBtn:0,
        		skin: 'demo-class',
        		shadeClose:true,
        		content:'<img src="' + fileBasePath + data.printsPicUrl + '" style="max-height:600px;max-width:100%;">',
        		scrollbar:false
            });
        }
    });
	
	//删除
	function del(data, obj){
		var msg = '确认删除选中数据吗？';
		layer.confirm(msg, { icon: 3, title: '删除组件' }, function (index) {
			layer.close(index);
            //向服务端发送删除指令
            AjaxPostUtil.request({url:reqBasePath + "rmxcx019", params:{rowId: data.id}, type:'json', callback:function(json){
    			if(json.returnCode == 0){
    				top.winui.window.msg("删除成功", {icon: 1,time: 2000});
    				loadTable();
    			}else{
    				top.winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
    			}
    		}});
		});
	}
	
	//上移
	function topOne(data){
		AjaxPostUtil.request({url:reqBasePath + "rmxcx017", params:{rowId: data.id}, type:'json', callback:function(json){
			if(json.returnCode == 0){
				top.winui.window.msg("上移成功", {icon: 1,time: 2000});
				loadTable();
			}else{
				top.winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
			}
		}});
	}
	
	//下移
	function lowerOne(data){
		AjaxPostUtil.request({url:reqBasePath + "rmxcx018", params:{rowId: data.id}, type:'json', callback:function(json){
			if(json.returnCode == 0){
				top.winui.window.msg("下移成功", {icon: 1,time: 2000});
				loadTable();
			}else{
				top.winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
			}
		}});
	}
	
	//编辑
	function edit(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/rmgroupmember/rmgroupmemberedit.html", 
			title: "编辑组件",
			pageId: "rmgroupmemberedit",
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	top.winui.window.msg("操作成功", {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	top.winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
			}});
	}
	
	//绑定属性
	function bindProperty(data){
		rowId = data.id;
		_openNewWindows({
			url: "../../tpl/rmgroupmember/bindproperty.html", 
			title: "绑定属性",
			pageId: "bindproperty",
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	top.winui.window.msg("操作成功", {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	top.winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
			}});
	}
	
	//刷新数据
    $("body").on("click", "#reloadTable", function(){
    	loadTable();
    });
    
    //新增
    $("body").on("click", "#addBean", function(){
    	_openNewWindows({
			url: "../../tpl/rmgroupmember/rmgroupmemberadd.html", 
			title: "新增组件",
			pageId: "rmgroupmemberadd",
			callBack: function(refreshCode){
                if (refreshCode == '0') {
                	top.winui.window.msg("操作成功", {icon: 1,time: 2000});
                	loadTable();
                } else if (refreshCode == '-9999') {
                	top.winui.window.msg("操作失败", {icon: 2,time: 2000});
                }
			}});
    });
    
    function loadTable(){
    	table.reload("messageTable", {where:{rmGroupId:$("#rmGroupId").val(), rmTypeId:$("#rmTypeId").val()}});
    }
    
    exports('rmgroupmemberlist', {});
});
