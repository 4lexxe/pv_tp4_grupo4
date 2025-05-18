import {useCallback } from 'react';
export const useFeedback = ({setFeedback}) => {
    
    const showFeedback = useCallback((message, type = 'success') => {
    setFeedback({
        message,
        type,
        visible: true
    });

    setTimeout(() => {
        setFeedback(prev => ({ ...prev, visible: false }));
    }, 3000);
    }, []);

    return {
        showFeedback
    };
}