// import { useState } from "react";
// import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
// import firebase from "firebase/app";

// // Initialize Firebase


// const storage = firebase.storage();

// export default function Home() {
//   const [videos, setVideos] = useState<{ url: string; comments: string[] }[]>([]); // State to store uploaded videos and their comments
//   const [comment, setComment] = useState<string>(""); // State to store user's comment

//   const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       Array.from(files).forEach((file) => {
//         const fileRef = storage.ref(`videos/${file.name}`);
//         fileRef.put(file).then(() => {
//           fileRef.getDownloadURL().then((url) => {
//             setVideos((prevVideos) => [...prevVideos, { url, comments: [] }]);
//           });
//         });
//       });
//     }
//   };

//   const handleAddComment = (index: number) => {
//     if (comment.trim() !== "") {
//       setVideos((prevVideos) => {
//         const updatedVideos = [...prevVideos];
//         updatedVideos[index].comments.push(comment);
//         return updatedVideos;
//       });
//       setComment(""); // Clear the input field after adding a comment
//     }
//   };

//   return (
//     <>
//       <Box>
//         {/*Video upload section */}
//         <Card className="videoupload">
//           <CardContent>
//             <Typography variant="h5">Upload Video</Typography>
//             <input type="file" accept="video/*" multiple onChange={handleVideoUpload} />
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Video list section */}
//       {videos.map((video, index) => (
//         <Box key={index}>
//           <Card className="videolayback" style={{ marginTop: "30px" }}>
//             <CardContent>
//               <Typography variant="h5">Video Playback</Typography>
//               <video src={video.url} controls />
//             </CardContent>
//             <CardActions>
//               {/* Button to add comment */}
//               <Button variant="contained" color="primary" onClick={() => handleAddComment(index)}>
//                 Add Comment
//               </Button>
//             </CardActions>
//           </Card>

//           {/* Comment section */}
//           <Card className="videocomment" style={{ marginTop: "30px" }}>
//             <CardContent>
//               <Typography variant="h5">Comments</Typography>
//               {video.comments.map((comment, commentIndex) => (
//                 <Typography key={commentIndex}>{comment}</Typography>
//               ))}
//               {/* Input field for adding new comment */}
//               <TextField
//                 variant="outlined"
//                 placeholder="Add a comment..."
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />
//             </CardContent>
//             <CardActions>
//               {/* Button to add comment */}
//               <Button variant="contained" color="primary" onClick={() => handleAddComment(index)}>
//                 Add Comment
//               </Button>
//             </CardActions>
//           </Card>
//         </Box>
//       ))}
//     </>
//   );
// }
