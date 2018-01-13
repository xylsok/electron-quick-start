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
const shell = require('electron').shell;
const path = require("path");
$("#selectDir").click(function () {
	dialog.showOpenDialog({
		properties: ['openDirectory', 'createDirectory']
	}, function selectDirCallback(x) {
		$('#projectPath').text(x[0]);
	});
})
$('#proNmae').keyup(function () {
	$('#springAppName').val($('#proNmae').val());
	$('#artifactId').val($('#proNmae').val())
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
	var jdbcDb = $('#jdbcDb').val();
	var jdbcUsername = $('#jdbcUsername').val();
	var jdbcPwd = $('#jdbcPwd').val();
	var springAppName = $('#springAppName').val();
	var springAppProt = $('#springAppProt').val();
	var rootPath = projectPath + "/" + proName;
	var defRootPath = projectPath + "/" + proName + "/" + defPackageDir;
	var newPackageDir = packageDir.replace(new RegExp("\\.", 'g'), '/');
	var newDirPackageDir = packageDir.replace(new RegExp("\\.", 'g'), '.');
	console.log(newPackageDir);
	var rootPathAndPackageDir = projectPath + "/" + proName + "/" + defPackageDir + 'java/' + newPackageDir;
	var indexs = [index1, index2, index3, index4, index5, index6, index7, index8, index9];
	mkdirs(rootPathAndPackageDir, function (err) {
		if (err) {
			return dialog.showErrorBox('系统提示！', '创建' + defRootPath + '目录失败！');
		}
		indexs.forEach(function (x) {
			mkdirs(rootPathAndPackageDir + '/' + x, function (err) {
				if (err) {
					return dialog.showErrorBox('系统提示！', '创建' + rootPathAndPackageDir + '/' + x + '目录失败！');
				}
			})
		})
		mkdirs(defRootPath + '/resources', function (err) {
			if (err) {
				return dialog.showErrorBox('系统提示！', '创建' + rootPathAndPackageDir + '/' + x + '目录失败！');
			}
		})
		$('#msg').html("目录创建成功,正在拷贝文件...");
		setTimeout(function () {
			fs.readFile('./sources/Main.java', 'utf-8', function (error, data) {
				data = data.replace('myPackage', newDirPackageDir);
				fs.writeFile(rootPathAndPackageDir + '/Main.java', data, 'utf-8', function (err) {
					if (err) {
						return dialog.showErrorBox('系统提示！', 'writeFile Error！');
					}
				})
			})
			fs.readFile('./sources/Swagger2.java', 'utf-8', function (error, data) {
				data = data.replace('myPackage', newDirPackageDir);
				data = data.replace('mySwaggerDir', newDirPackageDir + '.ui');
				data = data.replace('myProdectName', proNmae);
				fs.writeFile(rootPathAndPackageDir + '/Swagger2.java', data, 'utf-8', function (err) {
					if (err) {
						return dialog.showErrorBox('系统提示！', 'writeFile Error！');
					}
				})
			})
			fs.readFile('./sources/JooqDao.java', 'utf-8', function (error, data) {
				data = data.replace('myDefaultPackPath', newDirPackageDir);
				fs.writeFile(rootPathAndPackageDir + '/dao/JooqDao.java', data, 'utf-8', function (err) {
					console.log(err);
					if (err) {
						return dialog.showErrorBox('系统提示！', 'writeFile Error！');
					}
				})
			})
			fs.readFile('./sources/application.properties', 'utf-8', function (error, data) {
				data = data.replace('myPajectName', springAppName);
				data = data.replace("myPort", springAppProt);
				data = data.replace("myJdbcHost", jdbcHost);
				data = data.replace("myJdbcPort", jdbcPort);
				data = data.replace("myJdbcDb", jdbcDb);
				data = data.replace("myJdbcUsername", jdbcUsername);
				data = data.replace("myJdbcPassword", jdbcPwd);
				fs.writeFile(defRootPath + '/resources' + '/application.properties', data, 'utf-8', function (err) {
					if (err) {
						return dialog.showErrorBox('系统提示！', 'writeFile Error！');
					}
				})
			})
			fs.readFile('./sources/logback.xml', 'utf-8', function (error, data) {
				fs.writeFile(defRootPath + '/resources' + '/logback.xml', data, 'utf-8', function (err) {
					if (err) {
						return dialog.showErrorBox('系统提示！', 'writeFile Error！');
					}
				})
			})
			fs.readFile('./sources/pom.xml', 'utf-8', function (error, data) {
				data = data.replace('myGroupId', groupId);
				data = data.replace('myArtifactId', artifactId);
				data = data.replace('myHost', jdbcHost);
				data = data.replace('myUsername', jdbcUsername);
				data = data.replace('myPassword', jdbcPwd);
				data = data.replace('myPort', jdbcPort);
				data = data.replace('myDb', jdbcDb);
				data = data.replace('myTable', "*");
				fs.writeFile(rootPath + '/pom.xml', data, 'utf-8', function (err) {
					if (err) {
						return dialog.showErrorBox('系统提示！', 'writeFile Error！');
					}
				})
			})
			fs.readFile('./sources/.gitignore', 'utf-8', function (error, data) {
				fs.writeFile(rootPath + '/.gitignore', data, 'utf-8', function (err) {
					if (err) {
						return dialog.showErrorBox('系统提示！', 'writeFile Error！');
					}
				})
			})
			$('#msg').html("success " + '&nbsp;&nbsp;&nbsp;&nbsp; <a href="#" id="showDir" class="btn btn-xs btn-default">查看</a>');
		}, 5000);
	})
}
$(document).on('click', '#showDir', function () {
	var projectPath = $('#projectPath').text();
	var proNmae = $('#proNmae').val();
	shell.showItemInFolder(projectPath + "/" + proNmae);
});
//递归创建目录 异步方法
function mkdirs(dirname, callback) {
	fs.exists(dirname, function (exists) {
		if (exists) {
			callback();
		} else {
			// console.log(path.dirname(dirname));
			mkdirs(path.dirname(dirname), function () {
				fs.mkdir(dirname, callback);
				console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录');
			});
		}
	});
}

