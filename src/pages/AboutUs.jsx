import { React, useState } from "react"
import GoogleMapReact from 'google-map-react'


const AnyReactComponent = ({ text }) => <div style={{ fontSize: '24px', cursor: 'pointer' }}>{text}</div>;

export function AboutUs() {
    const zoom = 11
    const branches = [
        { name: "Tel Aviv", lat: 32.0853, lng: 34.7818 },
        { name: "Haifa", lat: 32.7940, lng: 34.9896 },
        { name: "Jerusalem", lat: 31.7683, lng: 35.2137 },
    ]

    const [center, setCenter] = useState(branches[0])


    function handleClick({ lat, lng }) {
        setCenter({ lat, lng })
    }

    function handleBranchClick(branch) {
        setCenter({ lat: branch.lat, lng: branch.lng })
    }



    return (
        <section>
            <h2>About Us</h2>
            <p>Welcome to our toy shop! We have branches all over Israel. Click on a
                branch to center the map and see our location.</p>
            <div style={{ marginBottom: "1rem" }}>
                {branches.map((branch) => (
                    <button
                        key={branch.name}
                        onClick={() => handleBranchClick(branch)}
                        style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}
                    >
                        {branch.name}
                    </button>
                ))}
            </div>

            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCKZoA_Qss6htiB1YCtM2Z5ceIHoCAPDgs" }}
                    center={center}
                    defaultZoom={zoom}
                >
                    {branches.map(branch => (
                        <AnyReactComponent
                            key={branch.name}
                            lat={branch.lat}
                            lng={branch.lng}
                            text="📍"
                        />
                    ))}
                </GoogleMapReact>
            </div>
        </section>
    )
}