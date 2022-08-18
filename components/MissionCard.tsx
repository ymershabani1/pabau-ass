import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface P{
    id: string,
    image?: string,
    missionName: string,
    rocketName: string,
}
const MissionCard = ({ id, image, missionName, rocketName }:P) => {
    return (
        <Link href={`/mission/${id}`}>
            <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={image || 'https://live.staticflickr.com/65535/50630802488_8cc373728e_o.jpg'}
                    alt="No Photo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {missionName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {rocketName}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}

export default MissionCard