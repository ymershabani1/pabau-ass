import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Grid, ImageListItem, Link } from '@mui/material'
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { MISSION_DETAILS_BY_ID } from '../../graphql/queries';
import Image from 'mui-image';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { collection, onSnapshot, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";


interface CommentsType{
  id: string,
  missionId?: number,
  comment?: string,
}
const Mission = () => {
  const router = useRouter()
  const { id } = router.query
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<CommentsType[]>([])
  const { data: details, loading } = useQuery(MISSION_DETAILS_BY_ID, {
    variables: { id },
  })



  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "comments"),orderBy("timestamp", "desc")),
      (snapshot) => {
        setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );


    return unsub;
  }, [db]);
  // console.log(comments);
  const addComment = async () => {

    const docRef = await addDoc(collection(db, "comments"), {
      missionId: Number(id),
      comment: newComment,
      timestamp: serverTimestamp(),
    });

    setNewComment("")
  };
  return (
    <>{
      loading ? <h1>LOADING</h1> : (
        <><Link href="/">
          <Button>
            BACK TO HOMPAGE
          </Button>
        </Link>
        <Grid sx={{ flexGrow: 1 }} container spacing={3} direction="row" justifyContent="center" alignItems="top">
          <Grid item xs={4}>
            <Image src={details.launch.links.flickr_images} width="100%" />
          </Grid>
          <Grid item xs={4}>
            <Typography mt={2} gutterBottom variant="h6" component="div">
              Details: {details.launch.details}
            </Typography>
            <Typography mt={2} gutterBottom variant="h6" component="div">
              Rocket name: {details.launch.rocket.rocket_name}
            </Typography>
            <Typography mt={2} gutterBottom variant="h6" component="div">
              Rocket type: {details.launch.rocket.rocket_type}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Rocket country: {details.launch.rocket.rocket.country}
            </Typography>
            <Typography gutterBottom variant="h6" component="div" align="justify">
              Rocket description: {details.launch.rocket.rocket.description}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>All comments:</Typography>
            <Typography>{comments.filter((comment) => comment.missionId === Number(id)).map((comment) => (
              <p>{comment.comment}</p>
            ))}
            </Typography>

            <Box component="form" noValidate autoComplete="off">
              <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Enter a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} minRows="{5}" />
                <Button variant="contained" color="success" onClick={addComment}>
                  POST COMMENT
                </Button>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        </>
      )
    }
    </>
  )
}

export default Mission