## react-list-scroll

[中文文档](/README_ZH.md)

###  Usage
```javascript
import Scroll from "react-list-scroll";
import List from "./list";
 
<Scroll>
    <List></List>
</Scroll>
```

### Options

`props.xxx`

```javascript
<Scroll
    disable={xxx}
    isEnd={xxx}
    loadDataForScroll={() => {}}
>
 
</Scroll>
```
* disable
	- disable scroll event
* scrollStyle
	- style of scroll component
* scrollPoint
	- user customized point to trigger loadDataForScroll
```javascript
// this is the logic for comparison 
scrollTop > this.props.scrollPoint
```
* isHalf
	- scroll to half and trigger loadDataForScroll
* isEnd
	- the list reaches the end
* loadDataForScroll
	- callback passed from parent component

* `this.scrollEle.xxx`

```javascript
<Scroll
	ref={(scrollEle) => {
		this.scrollEle = scrollEle;
	}}
>
</Scroll>

this.scrollEle.xxx
```

* prvScrollTop
	- position of last scroll



### Caveat
* If there two list, please put them inside Scroll like this:

```javascript
<Scroll>
	<List></List>
	<List></List>
</Scroll>
```

If your two-list scrolling is using block and none to display, please put your restoring scrolling position logic inside your switching tab logic.

If your two-list scrolling requires destruction of another list, you can destroy `<Scroll>` and recreate it. After componentWillMount is called, you can restore the position via prvScrollTop

### Preact Version

```javascript
import Scroll from 'react-list-scroll/pindex';
```
