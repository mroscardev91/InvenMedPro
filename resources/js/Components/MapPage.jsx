import React from 'react';

const MapPage = ({ address }) => {
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBSimOhkhTyZwhiuMmdjojBX67bOBkVaJE&q=${encodeURIComponent(address)}`;

    return (
        <iframe
            title="Location Map"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            allowFullScreen
            loading="lazy"
        ></iframe>
    );
};

export default MapPage;