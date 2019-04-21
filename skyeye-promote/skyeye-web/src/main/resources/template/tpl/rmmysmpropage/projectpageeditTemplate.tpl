{{#bean}}
    <div class="layui-form-item">
        <label class="layui-form-label">页面名称<i class="red">*</i></label>
        <div class="layui-input-block">
        	<input type="text" id="pageName" name="pageName" win-verify="required" placeholder="请输入页面名称" class="layui-input" maxlength="50" value="{{pageName}}"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">文件名</label>
        <div class="layui-input-block">
        	<input type="text" id="fileName" name="fileName" placeholder="请输入文件名" class="layui-input" maxlength="50" value="{{fileName}}"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">路径</label>
        <div class="layui-input-block">
        	<input type="text" id="filePath" name="filePath" placeholder="请输入路径" class="layui-input" maxlength="50" value="{{filePath}}"/>
        	<div class="layui-form-mid layui-word-aux">
        		小程序导出路径为：page/路径/文件名.文件类型（文件类型：js、json、wxml、wxss）<br>
        		H5页面导出路径为：html/路径/文件名.html；对应JS导出路径为：js/路径/文件名.js
        	</div>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="winui-btn" id="cancle">取消</button>
            <button class="winui-btn" lay-submit lay-filter="formEditBean">保存</button>
        </div>
    </div>
{{/bean}}