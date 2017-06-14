'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./index.less');

var _global = require('global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nav = _global2.default && _global2.default.navigator ? _global2.default.navigator : null;
var ua = nav ? navigator.userAgent.toLowerCase() : "";

var _platform = function _platform(os) {
	var ver = ('' + (new RegExp(os + '(\\d+((\\.|_)\\d+)*)').exec(ua) || [, 0])[1]).replace(/_/g, '.');
	// undefined < 3 === false, but null < 3 === true
	return parseFloat(ver) || undefined;
};

var os = {
	ios: _platform('os '),
	android: _platform('android[/ ]'),
	pc: !_platform('os ') && !_platform('android[/ ]')
};

var Scroll = function (_Component) {
	_inherits(Scroll, _Component);

	function Scroll(props, context) {
		_classCallCheck(this, Scroll);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

		_this.state = {};
		_this.prvScrollTop = 0;
		_this.bindScroll = _this.bindScroll.bind(_this);
		_this.scrollEvt = _this.scrollEvt.bind(_this);
		_this.timer = null;
		return _this;
	}

	Scroll.prototype.componentWillMount = function componentWillMount() {
		this.prvScrollTop = 0;
	};

	Scroll.prototype.componentDidMount = function componentDidMount() {
		this.bindScroll();
	};

	Scroll.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};

	Scroll.prototype.componentWillUnmount = function componentWillUnmount() {
		this.scrollContainer.removeEventListener('scroll', this.scrollEvt);
	};

	Scroll.prototype.bindScroll = function bindScroll() {
		this.scrollContainer = !os.ios ? _global2.default : this.scrollContainer;
		this.scrollContainer.addEventListener('scroll', this.scrollEvt);
	};

	Scroll.prototype.scrollEvt = function scrollEvt(evt) {
		var _this2 = this;

		// ios一般绑定在具体元素上，android一般绑定在window上
		var isWindow = this.scrollContainer === _global2.default;

		// 延迟计算
		this.timer && clearTimeout(this.timer);
		this.timer = setTimeout(function () {
			if (_this2.props.disable || _this2.props.isEnd) {
				return;
			}

			var scrollEle = isWindow ? _this2.scrollContainer.document : _this2.scrollContainer;
			var scrollTop = isWindow ? scrollEle.body.scrollTop : scrollEle.scrollTop;

			// 防止向上滚动也拉数据
			if (_this2.prvScrollTop > scrollTop) {
				return;
			}
			_this2.prvScrollTop = scrollTop;

			var containerHeight = isWindow ? scrollEle.documentElement.clientHeight : scrollEle.offsetHeight;
			var scrollHeight = isWindow ? scrollEle.body.scrollHeight : scrollEle.scrollHeight;

			if (scrollTop >= _this2.getTriggerPoint(scrollHeight, containerHeight)) {
				_this2.props.loadDataForScroll && _this2.props.loadDataForScroll();
			}
		}, 50);
	};

	Scroll.prototype.getTriggerPoint = function getTriggerPoint(scrollHeight, containerHeight) {
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
	};

	Scroll.prototype.render = function render() {
		var _this3 = this;

		var _props$scrollStyle = this.props.scrollStyle,
		    scrollStyle = _props$scrollStyle === undefined ? null : _props$scrollStyle;


		return _react2.default.createElement(
			'div',
			{
				className: "react-scroll-wrapper" + (os.ios ? " ios" : ""),
				style: scrollStyle,
				ref: function ref(scrollContainer) {
					if (!_this3.scrollContainer) {
						_this3.scrollContainer = scrollContainer;
					}
				}
			},
			this.props.children
		);
	};

	return Scroll;
}(_react.Component);

exports.default = Scroll;