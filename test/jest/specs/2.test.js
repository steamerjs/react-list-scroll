import React from 'react';
import { shallow, mount, render } from 'enzyme';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

jest.useFakeTimers();

describe.only('scroll in ios', () => {

	beforeAll(() => {

		Object.defineProperty(window.navigator, "userAgent", (function(_value){
		  return {
		    get: function _get() {
		      return _value;
		    },
		    set: function _set(v) {
		        _value = v;
		    }
		  };
		})(window.navigator.userAgent));

		let str = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
		window.navigator.userAgent = str;

	});

	test('scroll to bottom', (done) => {

        var Wrapper = require('../../../example/src/page/index-nowindow/container').default;
		var Scroll = require('../../../src').default;
        const wrapper = mount(<Wrapper />);
        const scrollComp = wrapper.find(Scroll);

		const scrollContainer = scrollComp.instance().scrollContainer;

		scrollContainer.addEventListener('scroll', function(e) {

			setTimeout(() => {
				try {
					expect(wrapper.state().status).toBe('at bottom: 768');
					done();
				}
				catch(err) {
					done.fail(err);
				}
			}, 100);

			jest.runAllTimers();

		});

		let scrollTop = 768;
		scrollContainer.scrollTop = scrollTop;
		scrollContainer.dispatchEvent(new window.Event('scroll', {
			scrollTop: scrollTop
		}));


	});

	test('scroll to half', (done) => {

        var Wrapper = require('../../../example/src/page/index-nowindow/container').default;
		var Scroll = require('../../../src').default;
        const wrapper = mount(<Wrapper />);
        wrapper.setState({type: 1});

        const scrollComp = wrapper.find(Scroll);
		const scrollContainer = scrollComp.instance().scrollContainer;

		scrollContainer.addEventListener('scroll', function(e) {

			setTimeout(() => {
				try {
					expect(wrapper.state().status).toBe('at half: 398');
					done();
				}
				catch(err) {
					done.fail(err);
				}
			}, 100);

			jest.runAllTimers();

		});

		let scrollTop = 398;
		scrollContainer.scrollTop = scrollTop;
		scrollContainer.dispatchEvent(new window.Event('scroll', {
			scrollTop: scrollTop
		}));

	});

	test('scroll to 10', (done) => {

        var Wrapper = require('../../../example/src/page/index-nowindow/container').default;
		var Scroll = require('../../../src').default;
        const wrapper = mount(<Wrapper />);
        wrapper.setState({type: 2});

        const scrollComp = wrapper.find(Scroll);
		const scrollContainer = scrollComp.instance().scrollContainer;

		scrollContainer.addEventListener('scroll', function(e) {

			setTimeout(() => {
				try {
					expect(wrapper.state().status).toBe('at 10: 10');
					done();
				}
				catch(err) {
					done.fail(err);
				}
			}, 100);

			jest.runAllTimers();

		});

		let scrollTop = 10;
		scrollContainer.scrollTop = scrollTop;
		scrollContainer.dispatchEvent(new window.Event('scroll', {
			scrollTop: scrollTop
		}));

	});


});
