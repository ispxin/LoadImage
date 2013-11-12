/**
 * LoadImage
 * Author Blog: http://www.wangyingran.com
 * Date: 2013-11-12
 */

;(function($, window, undefined) {
	
	var LoadImage = function(obj, isScaling, width, height) {
		
		// 初始化变量
		this.obj = obj;
		this.isScaling = isScaling;
		this.width = width;
		this.height = height;
		
		// 加载图片
		this.load();
		
	}
	
	LoadImage.prototype = {
		
		// 加载图片
		load : function() {
			
			var _this = this,
				imgUrl = this.obj.data('url'),
				newImg = new Image();
			
			newImg.src = imgUrl;
				
			newImg.onload = function() {
				
				// 等比例缩小
				if (_this.isScaling) {
					_this.scaling(this.width, this.height);
				}

				// 显示图片
				_this.obj.hide();
				_this.obj.attr('src', imgUrl);
				_this.obj.fadeIn(300);
				
				// 垂直居中
				_this.position();
				
			};
			
		},
		
		// 等比例缩小
		scaling : function(width, height) {
	
			if (width / height >= this.width / this.height) {
				
				if (width > this.width) {
					this.obj.width(this.width);
					this.obj.height((height * this.width) / width);
				} else {
					this.obj.width(width);
					this.obj.height(height);
				}
				
			} else {
				
				if (height > this.height) {
					this.obj.height(this.height);
					this.obj.width((width * this.height) / height);
				} else {
					this.obj.width(width);
					this.obj.height(height);
				}
				
			}

		},
		
		// 图片垂直居中定位
		position : function() {
			
			var imgWidth = this.obj.width(),
				imgHeight = this.obj.height(),
				left = (this.width - imgWidth) / 2,
				top = (this.height - imgHeight) /2;
				
			this.obj.css({ left:left, top:top });
				
		}
		
	}
	
	// 挂载到jQuery组件
	$.fn.LoadImage = function(isScaling, width, height) {
		this.each(function() {
			new LoadImage($(this), isScaling, width, height);
		});
	}
	
})(jQuery);