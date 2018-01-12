// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//var jq = require("jquery");
//console.log(jq);
//require('./node_modules/jquery/dist/jquery.min.js');
window.$ = window.jQuery = require('./node_modules/jquery/dist/jquery.min.js');
const electron = require('electron');
const dialog = electron.remote.dialog;
const fs = electron.remote.require('fs');
const ipc = require('electron').ipcMain;
$("#selectDir").click(function () {
	dialog.showOpenDialog({
		properties: ['openDirectory', 'createDirectory']
	}, function selectDirCallback(x) {
		$('#projectPath').text(x[0]);
	});
})
$("#start").click(function () {
	var projectPath = $('#projectPath').text();
	var proNmae = $('#proNmae').val();
	if (!proNmae) {
		alert("请输入项目名称");
		//dialog.showErrorBox('项目名称不能为空', '请输入项目名称后继续！');
		return;
	}
	if (!projectPath) {
		alert("请选择程序存放目录");
		return;
	} else {
		fs.readdir(projectPath + '/' + proNmae, function (err, data) {
			if (data && data.length > 0) {
				dialog.showErrorBox('系统提示！', '在该目录下发现同名项目,请删除或更改该项目名称后重试！');
				return;
			} else {
				start(projectPath, proNmae);
			}
		});
	}
})
function start(projectPath, proName) {
	console.log(projectPath);
	console.log(proName);
	var proNmae = $('#proNmae').val();
	var groupId = $('#groupId').val();
	var artifactId = $('#artifactId').val();
	var defPackageDir = $('#defPackageDir').val();
	var packageDir = $('#packageDir').val();
	var index1 = $('#index1').val();
	var index2 = $('#index2').val();
	var index3 = $('#index3').val();
	var index4 = $('#index4').val();
	var index5 = $('#index5').val();
	var index6 = $('#index6').val();
	var index7 = $('#index7').val();
	var index8 = $('#index8').val();
	var index9 = $('#index9').val();
	var jdbcHost = $('#jdbcHost').val();
	var jdbcPort = $('#jdbcPort').val();
	var jdbcPort = $('#jdbcPort').val();
	var jdbcUsername = $('#jdbcUsername').val();
	var jdbcPwd = $('#jdbcPwd').val();
	var springAppName = $('#springAppName').val();
	var springAppProt = $('#springAppProt').val();
	var rootPath = projectPath + "/" + proName;
	var defRootPath = projectPath + "/" + proName+"/src";
	var defRootPath2 = projectPath + "/" + proName+"/src/main";
	//先删除

	fs.mkdir(rootPath, function callback(err) {
		if (err) {
			return dialog.showErrorBox('系统提示！', '创建'+rootPath+'目录失败！');
		}
		$('#msg').html(rootPath+"--目录创建成功。");
		fs.mkdir(defRootPath, function callback(err) {
			if (err) {
				return dialog.showErrorBox('系统提示！', '创建'+defRootPath+'目录失败！');
			}
			$('#msg').html(defRootPath+"--目录创建成功。");
			fs.mkdir(defRootPath2, function callback(err) {
				if (err) {
					return dialog.showErrorBox('系统提示！', '创建'+defRootPath2+'目录失败！');
				}
				$('#msg').html(defRootPath2+"--目录创建成功。");
			})
		})
	})


}
