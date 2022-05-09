import React from "react"
import { Card, Button } from 'antd';

const {Meta} = Card;

const BlogCard = ({title, description, src}) => {
    return (
        <Card
            hoverable
            // loading
            style={{width: 240}}
            cover={<img alt="example" src={src}/>}
        >
            <Meta title={title} description={description}/>
            <Button type="primary">More ></Button>
        </Card>
    )
}

export default BlogCard;
