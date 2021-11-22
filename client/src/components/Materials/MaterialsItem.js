import React from "react";

export default function MaterialsItem(props) {

    return (
        <>
            {
            props.materials?.map((item, key) => 
                <a
                    key={`materials_index=${key}`} 
                    className="materialsBlock"
                    data-fancybox 
                    data-type="iframe" 
                    data-src={`https://www.youtube.com/embed/${item.href.split("&")[0].split("=")[1]}?autoplay=1&mute=1`}
                >
                    <div className="pictureContainer">
                        <img 
                            className="materialsPicture"
                            src={`https://i.ytimg.com/vi/${item.href.split("&")[0].split("=")[1]}/mqdefault.jpg`} 
                        />
                        <img src="/assets/images/youtube-button.png" className="youtubeButton" />
                    </div>
                    <p className="description">{item.description}</p>
                </a>
            )}
        </>
    );
}