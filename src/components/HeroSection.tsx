'use client'
import { useEffect, useRef } from 'react';

function Body() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.play().catch(error => {
               
                console.error('Autoplay was prevented:', error);
            });
        }
    }, []);

    return (
        <div className=''>
            <div className="mt-4 flex justify-end m-4">
                <input type="text" placeholder="search" className="shadow-lg mx-2 px-6 rounded-lg" />
                <button className="p-2 px-4 bg-blue-600 text-white rounded-md ml-8">Search</button>
            </div>
           <div className='relative'>
           <div className="w-full h-60">
                <video ref={videoRef} poster="https://www.foodpanda.com/wp-content/uploads/2023/03/fp-home-video-poster.jpg" className="bg-video__content h-[450px] w-full object-cover" autoPlay muted loop>
                    <source src="https://player.vimeo.com/progressive_redirect/playback/887673049/rendition/1080p/file.mp4?loc=external&log_user=0&signature=d2fb16e953bceb3394adfc2bdb6da0705e4fcfd9e7e60047193939fd2a7a7e46" type="video/mp4"/>
                </video>
            </div>
            <div className='absolute  p-4 item-center ml-24 top-32 '>
                <h1 className='text-white font-bold text-6xl font-mono'>
                    Food and grocieries
                    <br />
                    in a tap
                </h1>
            </div>
           </div>
        </div>
    );
}

export default Body;
