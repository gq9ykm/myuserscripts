

// 在页面上下文中执行GA4代码
export function injectGA4() {
    const GA_MEASUREMENT_ID = 'G-PHPDMCG4FW'; // 替换为你的ID
    
    // 创建并插入gtag脚本
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    
    // 创建初始化脚本
    const initScript = document.createElement('script');
    initScript.textContent = `
        // 在页面上下文中初始化GA4
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
        
        console.log('🎯 GA4在页面上下文中初始化完成');
        
        // 发送页面浏览事件
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: location.href
        });
        
        // 暴露给油猴脚本使用
        window._ga4Track = function(eventName, params) {
            gtag('event', eventName, params);
        };
    `;
    
    // 先插入初始化脚本
    document.head.appendChild(initScript);
    document.head.appendChild(gtagScript);
    
    console.log('GA4脚本已注入页面上下文');
}

// 通过页面上下文中的函数进行事件跟踪
export function sendEvent(eventName, parameters = {}) {
    // 等待页面上下文中的函数可用
        unsafeWindow._ga4Track(eventName, parameters);
        console.log('事件发送:', eventName, parameters);
}