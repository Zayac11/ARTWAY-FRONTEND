import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import s from './Image.module.css'
import './Image.css'

const Image = (props) => {

    const images = props.images.filter(m => m !== null).map(m => {
        return {
            original: m,
            thumbnail: m,
        }
    })

    return (
        <div className={s.photoContainer}>
            <div className={s.photo}>
                <ImageGallery
                    items={images}
                    showThumbnails={false}
                    showPlayButton={false}
                    autoPlay={false}
                    originalClass={s.original}
                    thumbnailClass ={s.original}
                />
            </div>
        </div>
    )
}

export default Image
