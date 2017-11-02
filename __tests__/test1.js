import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Wrapper from '../example/src/index/container';


jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

jest.useFakeTimers();

describe('scroll in android', () => {
	test('scroll to bottom', (done) => {

		const wrapper = mount(<Wrapper />);

		window.addEventListener('scroll', function(e) {
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
		window.document.body.scrollTop = scrollTop;
		window.dispatchEvent(new window.Event('scroll', {
			scrollTop: scrollTop
		}));

	});

	test('scroll to half', (done) => {

		const wrapper = mount(<Wrapper />);
		wrapper.find('ul').find('li').at(1).simulate('click');

		window.addEventListener('scroll', function(e) {
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
		window.document.body.scrollTop = scrollTop;
		window.dispatchEvent(new window.Event('scroll', {
			scrollTop: scrollTop
		}));

	});

	test('scroll to 10', (done) => {

		const wrapper = mount(<Wrapper />);
		wrapper.find('ul').find('li').at(2).simulate('click');

		window.addEventListener('scroll', function(e) {
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
		window.document.body.scrollTop = scrollTop;
		window.dispatchEvent(new window.Event('scroll', {
			scrollTop: scrollTop
		}));

	});

	test('test disable and isEnd', (done) => {

		const wrapper = mount(<Wrapper />);
		wrapper.setState({disable: true, isEnd: true});

		window.addEventListener('scroll', function(e) {
			setTimeout(() => {
				try {
					expect(wrapper.state().status).toBe('');
					done();
				}
				catch(err) {
					done.fail(err);
				}
			}, 100);
			jest.runAllTimers();

		});

		let scrollTop = 768;
		window.document.body.scrollTop = scrollTop;
		window.dispatchEvent(new window.Event('scroll', {
			scrollTop: scrollTop
		}));

	});
});
