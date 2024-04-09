import { useEffect } from 'react';
import { loadOml2d } from 'oh-my-live2d';
const Live2DWidget = (options) => {
    useEffect(() => {
        loadOml2d(options);
    }, []);
    return null;
};
export default Live2DWidget;
