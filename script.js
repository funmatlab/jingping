document.addEventListener('DOMContentLoaded', () => {
    // 1. SPA 页面路由切换逻辑
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            // 切换导航栏 Active 状态
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // 切换页面 Active 状态
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetId) {
                    page.classList.add('active');
                }
            });
            
            // 平滑滚动至顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. 论文列表作者名字自动高亮功能
    // 自动将 "J. P. Hu" 或 "Jingping Hu" 加粗，方便访客快速识别您的贡献
    const pubItems = document.querySelectorAll('.pub-item');
    pubItems.forEach(item => {
        let html = item.innerHTML;
        // 匹配常见的英文署名格式
        html = html.replace(/J\. P\. Hu/g, '<strong style="color: var(--accent-red);">J. P. Hu</strong>');
        html = html.replace(/Jingping Hu/g, '<strong style="color: var(--accent-red);">Jingping Hu</strong>');
        html = html.replace(/胡敬平/g, '<strong style="color: var(--accent-red);">胡敬平</strong>');
        item.innerHTML = html;
    });

    // 3. 详情页点击阻止冒泡 (优化交互)
    const summaries = document.querySelectorAll('summary');
    summaries.forEach(summary => {
        summary.addEventListener('click', (e) => {
            // 确保点击 summary 内的链接时不会意外折叠面板
            if (e.target.tagName === 'A') {
                e.stopPropagation();
            }
        });
    });
});