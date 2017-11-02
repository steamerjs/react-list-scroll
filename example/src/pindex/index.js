/** @jsx h */
import Preact, { h, render, Component } from 'preact';
import Scroll from '../../../src/pindex';

require('./index.less');

export class List extends Component {
	constructor(props, context) {
		super(props, context);
	}


	componentDidMount() {
		
	}

	render() {

		let {
			type 
		} = this.props;

		return (
			<ul>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
				<li>123</li>
			</ul>
		);
	}
}

export default class Wrapper extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			type: 0, // 0 for bottom, 1 for half, 2 for customization
			status: "",
			disable: false,
			isEnd: false,
		};

		this.loadDataForScrollAtBottom = this.loadDataForScrollAtBottom.bind(this);
		this.loadDataForScrollAtHalf = this.loadDataForScrollAtHalf.bind(this);
		this.loadDataForScrollAt10 = this.loadDataForScrollAt10.bind(this);
	}

	componentDidMount() {
		
	}

	loadDataForScrollAtBottom() {
		this.setState({
			status: "at bottom: " + this.scrollEleAtBottom.prvScrollTop
		});
	}

	loadDataForScrollAtHalf() {
		this.setState({
			status: "at half: " + this.scrollEleAtHalf.prvScrollTop
		});
	}

	loadDataForScrollAt10() {
		this.setState({
			status: "at 10: " + this.scrollEleAt10.prvScrollTop
		});
	}

	renderScroll() {
		let {
			type
		} = this.state;

		let color = {
			0: "red",
			1: "yellow",
			2: "blue",
		};

		let style = {
			background: color[type]
		};

		if (type === 0) {
			return (
				<Scroll 
					key={1}
		    		wrapper={".react-scroll-wrapper"}
		    		ref={(scrollEle) => {
						this.scrollEleAtBottom = scrollEle;
					}}
					useWindow={true}
		    		loadDataForScroll={this.loadDataForScrollAtBottom}
		    		scrollStyle={style}
		    	>
		    		<List 
						type={type}
					/>
		    	</Scroll>
			)
		}
		else if (type === 1) {
			return (
				<Scroll 
					key={2}
		    		wrapper={".react-scroll-wrapper"}
		    		ref={(scrollEle) => {
						this.scrollEleAtHalf = scrollEle;
					}}
					useWindow={true}
		    		loadDataForScroll={this.loadDataForScrollAtHalf}
		    		isHalf={true}
		    		scrollStyle={style}
		    	>
		    		<List 
						type={type} 
					/>
		    	</Scroll>
			)
		}
		else if (type === 2) {
			return (
				<Scroll 
					key={3}
		    		wrapper={".react-scroll-wrapper"}
		    		ref={(scrollEle) => {
						this.scrollEleAt10= scrollEle;
					}}
					useWindow={true}
		    		loadDataForScroll={this.loadDataForScrollAt10}
		    		scrollPoint={10}
		    		scrollStyle={style}
		    	>
		    		<List 
						type={type}
					/>
		    	</Scroll>
			)
		}
	}

	changeScrollType(type) {
		return () => {
			this.setState({
				type: type
			});
		};
	}

	render() {

		return (
			<div>
				<div style={{
					position: "fixed",
					right: "20px",
					bottom: "20px",
					zIndex: 6
				}}>{this.state.status}</div>
				<ul className="type">
					<li onClick={this.changeScrollType(0)}>滚动到底部</li>
					<li onClick={this.changeScrollType(1)}>滚动到一半</li>
					<li onClick={this.changeScrollType(2)}>滚动10px</li>
				</ul>
				
		    	{
		    		this.renderScroll()
		    	}
		        
		    </div>
		);
	}
}


render(
    <Wrapper />,
    document.getElementById('root')
);