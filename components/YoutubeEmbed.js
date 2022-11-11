import React from "react";
import PropTypes from "prop-types";
import styles from '../styles/component/comp_youtubeEmbeded.module.css'

const YoutubeEmbed = ({ embedId }) => (
    <div className={styles.videoResponsive}>
        <iframe
            // width="853"
            // height="480"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${embedId}?rel=0`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;