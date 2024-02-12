
import { Video } from "@/Typescript/interfaces/Video";
import { storage } from "@/firebase/config";
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
export default function Home() {
  const [videoURL, setVideoURL] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    const listRef = ref(storage, 'videos');
    listAll(listRef)
      .then((res) => {
        const videoPromises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { url };
        });
        Promise.all(videoPromises).then((videoUrls) => {
          setVideos(videoUrls);
        });
      }).catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);
  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, `videos/${file.name}`);
      const res = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setVideoURL(url);
    }
  };
  const listRef = ref(storage, 'files/uid');
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
      });
      res.items.forEach((itemRef) => {
      });
    }).catch((error) => {
    });
  console.log(listRef);
  console.log(videoURL);
  return (
    <>
      <Box >
        <Card className="videoupload" >
          <CardContent style={{paddingLeft:"750px", paddingTop:"60px",fontFamily:"Times New Roman" }}>
            <Typography variant="h5">Upload Video</Typography>
            <input type="file" accept="video/*" multiple onChange={handleVideoUpload}/>
          </CardContent>
        </Card>
      </Box >
      {videos.map((video) => (
        <TemporaryComment video={video} key={video?.url} />
      ))}
    </>
  );
}
type TemporaryCommentProps = {
  video: Video
}
function TemporaryComment(props: TemporaryCommentProps) {
  const { video } = props;
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<string[]>([]);
  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setComments((prevComments) => {
        const newComments = [...prevComments];
        newComments.push(comment);
        return newComments;
      });
      setComment("");
    }
  };
  return <Box className="videoplayback">
    <Card className="videoplaycom">
      <CardContent>
        <Typography variant="h5" style={{paddingLeft:"300px"}}>Video Playback</Typography>
        <video src={video.url} controls style={{ height: "400px", width: "750px" }} />
      </CardContent>
      <Box className="commentbox">
        <Card className="videocomment" style={{ marginTop: "30px" }}>
          <CardContent style={{ marginLeft: "70px", marginTop: "50px" }}>
            <TextField
              variant="outlined"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="warning" onClick={() => handleAddComment()} style={{ marginLeft: "120px" }}>Add Comment</Button>
          </CardActions>
        </Card>
        <Card className="viewcomment" sx={{ overflowY: "auto",  }}>
          <center><Typography variant="h5" style={{ paddingTop: "80px",margin: 1  }}>View Comments</Typography></center>
          {comments && comments.map((comment, commentIndex) => (
            <Typography key={commentIndex}>{comment}</Typography>
          ))}
        </Card>
      </Box>
    </Card>
  </Box>
}