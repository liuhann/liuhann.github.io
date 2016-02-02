---
title: The device shell for device preview
author: Hand
date: 2016-01-11
template: article.jade
---

DeviceShell is a jquery plugin to provide device shell for any div in a laptop html pages.  If your visit the page on mobile or pad, the content is auto set as full screened. 

![preview](preview.png)

## Basic Usage

    <script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="js/deviceshell.js"></script>

    $("#ipad").deviceshell({
		width: 800,
		type: 'ipad'
	});
	
	$("#iphone").deviceshell({
		width: 260
	});

## Preview

[Device Shell Preview ](/mockdevice/iphone.html)

[GitHub](https://github.com/liuhann/shell)
