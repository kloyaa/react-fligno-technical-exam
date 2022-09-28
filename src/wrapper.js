import React, { useRef } from 'react'
import LoadingOverlayWrapper from 'react-loading-overlay-ts';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';

function Wrapper({ children }) {
    const recipes = useSelector((state) => state.recipes);
    const loadingRef = useRef(null);
    return <LoadingOverlayWrapper
        active={recipes.loading}
        ref={loadingRef}
        spinner={<SyncLoader color='pink' size={10} />}>
        {children}
    </LoadingOverlayWrapper >;
}

export default Wrapper