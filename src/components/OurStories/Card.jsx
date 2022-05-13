import React from "react"
import {Card} from 'antd';
import {Link} from "react-router-dom";

const {Meta} = Card;

const StoryCard = ({title, text, src, id, date}) => {
    const formattedDate = date.slice(0, 10);
    const formattedText = text.substring(0, text.indexOf('.'));

    return (
        <Link to={`/our-stories/${id}`}>
            <Card
                hoverable
                // loading
                style={{width: 240}}
                cover={<img alt="Article's Image" src={src}/>}
            >
                <Meta title={title} description={formattedText}/>
                <p>{formattedDate}</p>
            </Card>
        </Link>
    )
}

export default StoryCard;
