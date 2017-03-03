## react-list-scroll

[English Documentation](/README.md)

### 使用

```javascript
import Scroll from "react-list-scroll";
import List from "./list";

<Scroll>
	<List></List>
</Scroll>
```

### 配置

#### `props.xxx`

```javascript
<Scroll
	disable={xxx}
	isEnd={xxx}
	loadDataForScroll={() => {}}
>

</Scroll>
```

* disable
	- 禁用滚动事件
* scrollStyle
	- 滚动组件样式
* scrollPoint
	- 用户自定义触发 loadDataForScroll 方法的位置
```javascript
// 具体的比较方法是，请注意传值
scrollTop > this.props.scrollPoint
```
* isHalf
	- 滚动到一半触发 loadDataForScroll
* isEnd
	- 通知滚动组件列表到底了
* loadDataForScroll
	- 触发的回调方法

####  `this.scrollEle.xxx`

```javascript
// 内部使用了ref方式，将 `Scroll` 组件存放到组件属性当中
<Scroll
	ref={(scrollEle) => {
		this.scrollEle = scrollEle;
	}}
>
</Scroll>

this.scrollEle.xxx
```

* prvScrollTop
	- 当前滚动到的位置



### 注意
* 如果有两个列表，请将它们像下面一样放到 `Scroll` 组件里面：

```javascript
<Scroll>
	<List></List>
	<List></List>
</Scroll>
```

如果是双列表滚动，且使用display的block和none切换，则请在切换列表的方法内，进行还原prvScrollTop

如果是双列表滚动，但使用替换的方式切换，则可以通过销毁<Scroll>同时重新创建，然后触发componentWillMount去还原prvScrollTop

### Preact版本

```javascript
import Scroll from 'react-list-scroll/pindex';
```

### Changelog
* v0.1.2 新增preact版本