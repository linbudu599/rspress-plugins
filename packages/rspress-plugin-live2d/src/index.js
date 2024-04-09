import path from 'node:path';
export default function rspressPluginLive2d(props = {}) {
    return {
        name: 'rspress-plugin-live2d',
        globalUIComponents: [
            [
                path.join(__dirname, 'components', 'Live2DWidget.tsx'),
                (props !== null && props !== void 0 ? props : {}),
            ],
        ],
    };
}
