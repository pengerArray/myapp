layui.config({
	base: basePath, 
	version: skyeyeVersion
}).define(['table', 'jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	    var $ = layui.$,
	    form = layui.form;
	    
 		showGrid({
		 	id: "showForm",
		 	url: reqBasePath + "rmxcx033",
		 	params: {rowId: parent.pageId},
		 	pagination: false,
		 	template: getFileContent('tpl/rmmysmpropage/projectpageeditTemplate.tpl'),
		 	ajaxSendLoadBefore: function(hdb){
		 	},
		 	ajaxSendAfter:function(json){
		 		
		 		form.render();
			    form.on('submit(formEditBean)', function (data) {
			    	//表单验证
			        if (winui.verifyForm(data.elem)) {
			        	var params = {
		        			name: $("#pageName").val(),
		        			filePath: $("#filePath").val(),
		        			fileName: $("#fileName").val(),
		        			rowId: parent.pageId,
			        	};
			        	
			        	AjaxPostUtil.request({url:reqBasePath + "rmxcx034", params:params, type:'json', callback:function(json){
			 	   			if(json.returnCode == 0){
				 	   			parent.layer.close(index);
				 	        	parent.refreshCode = '0';
			 	   			}else{
			 	   				top.winui.window.msg(json.returnMessage, {icon: 2,time: 2000});
			 	   			}
			 	   		}});
			        }
			        return false;
			    });
		 	}
 		});
	    
	    //取消
	    $("body").on("click", "#cancle", function(){
	    	parent.layer.close(index);
	    });
	});
});