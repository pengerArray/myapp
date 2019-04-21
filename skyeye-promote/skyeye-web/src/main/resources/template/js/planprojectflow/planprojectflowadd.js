layui.config({
	base: basePath, 
	version: skyeyeVersion
}).define(['jquery', 'winui'], function (exports) {
	winui.renderColor();
	layui.use(['form'], function (form) {
		var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	    var $ = layui.$,
	    form = layui.form;
	    
	    $("#projectName").html(parent.projectName);
	    
		form.render();
		
		//是否共享
 		form.on('switch(isShare)', function (data) {
 			//同步开关值
 			$(data.elem).val(data.elem.checked);
 		});
		
	    form.on('submit(formAddBean)', function (data) {
	    	//表单验证
	        if (winui.verifyForm(data.elem)) {
	        	var params = {
        			projectId: parent.projectId,
        			pId: parent.folderId,
        			title: $("#title").val(),
        			type: parent.type,
        			jsonContent: "",
	        	};
	        	
	        	if(data.field.isShare){
	        		params.isShare = '2';
	        	}else{
	        		params.isShare = '1';
	        	}
	        	
	        	AjaxPostUtil.request({url:reqBasePath + "planprojectflow002", params:params, type:'json', callback:function(json){
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
	    
	    //取消
	    $("body").on("click", "#cancle", function(){
	    	parent.layer.close(index);
	    });
	});
	    
});