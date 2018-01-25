import React, { Component } from 'react';

import './index.less';
import global from 'global';

let nav = (global && global.navigator) ? global.navigator : null;
let ua = nav ? navigator.userAgent.toLowerCase() : '';

let _platform = function(os) {
    let ver = ('' + (new RegExp(os + '(\\d+((\\.|_)\\d+)*)').exec(ua) || [,0])[1]).replace(/_/g, '.');
    // undefined < 3 === false, but null < 3 === true
    return parseFloat(ver) || undefined;
};

let os = {
    ios: _platform('os '),
    android: _platform('android[/ ]'),
    pc : !_platform('os ') && !_platform('android[/ ]')
};

export default class Scroll extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			
		};
		this.prvScrollTop = 0;
		this.bindScroll = this.bindScroll.bind(this);
		this.scrollEvt = this.scrollEvt.bind(this);
		this.timer = null;
	}

	componentWillMount() {
		this.prvScrollTop = 0;
	}

	componentDidMount() {
		this.bindScroll();
	}

	componentDidUpdate(prevProps, prevState) {
	
	}

	componentWillUnmount() {
		this.scrollContainer.removeEventListener('scroll', this.scrollEvt);
	}

	bindScroll() {
		this.scrollContainer = (os.android || this.props.useWindow) ? global : this.scrollContainer;
		console.log(this.scrollContainer);
		this.scrollContainer.addEventListener('scroll', this.scrollEvt);
	}

	scrollEvt(evt) {
		// ios一般绑定在具体元素上，android一般绑定在window上
		let isWindow = (this.scrollContainer === global);

		// 延迟计算
		this.timer && clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			if (this.props.disable || this.props.isEnd) {
				return;
			}

			let scrollEle = (isWindow) ? this.scrollContainer.document : this.scrollContainer;
			// 是处 scrollTop 兼容主要是参考了这个issue: https://stackoverflow.com/questions/20514596/document-documentelement-scrolltop-return-value-differs-in-chrome
			let scrollTop = (isWindow) ? (window.scrollY || window.pageYOffset) : 
							(scrollEle.body.scrollTop || scrollEle.scrollTop);
			
			// 防止向上滚动也拉数据
            if (this.prvScrollTop > scrollTop) {
				this.prvScrollTop = scrollTop;
                return;
            }
            this.prvScrollTop = scrollTop;

			let containerHeight = (isWindow) ? scrollEle.documentElement.clientHeight : scrollEle.offsetHeight;
			let scrollHeight = (isWindow) ? scrollEle.body.scrollHeight : scrollEle.scrollHeight;
			
			if (scrollTop >= this.getTriggerPoint(scrollHeight, containerHeight)) {
				this.props.loadDataForScroll && this.props.loadDataForScroll();
			}

		}, 50); 
	}

	getTriggerPoint(scrollHeight, containerHeight) {
		// 条件一: 滚动到中间拉数据
		if (this.props.isHalf) {
			return (scrollHeight - containerHeight) / 2;
		}
		// 条件二: 用户自定义
		else if (this.props.scrollPoint) {
			return this.props.scrollPoint;
		}
		// 条件三: 滚动到最底部才拉数据
		else {
			return scrollHeight - containerHeight;
		}
	}

	render() {

		let {
			scrollStyle,
			className
		} = this.props;

		let windowClass = this.props.useWindow ? '-window' : '',
			iosClass = os.ios ? 'ios' : '';

		return (
			<div 
				className={`react-scroll-wrapper${windowClass} ${iosClass} ${className}`}
				style={scrollStyle || null} 
				ref={(scrollContainer) => {
					if (!this.scrollContainer) {
						this.scrollContainer = this.props.scrollContainer || scrollContainer || document.querySelector('.react-scroll-wrapper');
					}
				}}
			>
			   {this.props.children}
			</div>
		);
	}
}
