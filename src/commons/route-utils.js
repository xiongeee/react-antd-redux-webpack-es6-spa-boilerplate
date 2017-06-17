import NProgress from 'nprogress';
import * as PubSubMsg from 'zk-react/utils/pubsubmsg';

NProgress.configure({showSpinner: false});
/**
 * 组件开始请求，可以用来显示loading
 */
export function startFetchingComponent() {
    NProgress.start();
    PubSubMsg.publish('fetching-page-start');
}

/**
 * 组件请求完成，可以用来隐藏loading
 */
export function endFetchingComponent() {
    NProgress.done();
    PubSubMsg.publish('fetching-page-end');
}

/**
 * 根据地址栏判断是否应该渲染组件，开速切换，由于组件异步，有可能出现窜页情况
 * @param {object} nextState
 * @returns {boolean}
 */
export function shouldComponentMount(nextState) {
    return window.location.pathname === nextState.location.pathname;
}
