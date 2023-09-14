import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeToast } from '../../store/reducers/toast-reducer';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function Toast() {
    const toastList = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch();

    useEffect(() => {
        const toastTimeout = setTimeout(() => {
            dispatch(removeToast());
        }, 3000);

        return () => clearTimeout(toastTimeout);
    }, [toastList, dispatch]);

    return (
        <>
            {toastList.map((toast: any, idx: number) => (
                <div key={idx} className={`toast active`}>
                    <p className={`toast__title ${toast.type}`}>{toast.title}</p>
                    <p className="toast__desc">{toast.desc}</p>
                    <Cross2Icon
                        className='toast__close'
                        onClick={() => dispatch(removeToast())}
                    />
                </div>
            ))}
        </>
    );
}





