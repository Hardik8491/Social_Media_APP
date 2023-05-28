import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Assessment,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [isClip, setIsClip] = useState(false);
  const [Clip,setClip]=useState(null);
  const [isAttachment,setIsAttachment] =useState(false);
  const [Attachment,setAttachment]=useState(null);
  const [isAudio,setIsAudio]=useState(false);
  const [Audio,setAudio]=useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = {
      userId: _id,
      description: post,
    };
    if (image) {
      formData.picture = image;
      formData.picturePath = image.name;
    }
    // const formData = new FormData();
    // formData.append("userId", _id);
    // formData.append("description", post);
    // if (image) {
    //   formData.append("picture", image);
    //   formData.append("picturePath", image.name);
    // }

    // const response = await fetch(`http://localhost:3001/posts`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${token}`,

    //  },
    //   body: formData,
    // });

    const response = await axios.post(`${backendUrl}/posts`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    const posts = await response.json();

    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}>
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}



      {isClip && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem">
          <Dropzone
            acceptedFiles=".mp4,.mkv,.mov,.webm,.swm,.gif"
            multiple={false}
            onDrop={(acceptedFiles) => setClip(acceptedFiles[0])}>
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}>
                  <input {...getInputProps()} />
                  {!Clip ? (
                    <p>Add clip Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{Clip.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {Clip && (
                  <IconButton
                    onClick={() => setClip(null)}
                    sx={{ width: "15%" }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}






{isAttachment && (
  <Box
    border={`1px solid ${medium}`}
    borderRadius="5px"
    mt="1rem"
    p="1rem">
    <Dropzone
      acceptedFiles=".pdf,.ppt,.xml,.html,.swm,.gif"
      multiple={false}
      onDrop={(acceptedFiles) => setAttachment(acceptedFiles[0])}>
      {({ getRootProps, getInputProps }) => (
        <FlexBetween>
          <Box
            {...getRootProps()}
            border={`2px dashed ${palette.primary.main}`}
            p="1rem"
            width="100%"
            sx={{ "&:hover": { cursor: "pointer" } }}>
            <input {...getInputProps()} />
            {!Assessment ? (
              <p>Add Attachment Here</p>
            ) : (
              <FlexBetween>
                <Typography>{}</Typography>
                <EditOutlined />
              </FlexBetween>
            )}
          </Box>
          {Attachment && (
            <IconButton
              onClick={() => setAttachment(null)}
              sx={{ width: "15%" }}>
              <DeleteOutlined />
            </IconButton>
          )}
        </FlexBetween>
      )}
    </Dropzone>
  </Box>
)}











{isAudio && (
  <Box
    border={`1px solid ${medium}`}
    borderRadius="5px"
    mt="1rem"
    p="1rem">
    <Dropzone
      acceptedFiles=".mp3,.mp4,.mkv,.webm,.swm,.gif"
      multiple={false}
      onDrop={(acceptedFiles) => setAudio(acceptedFiles[0])}>
      {({ getRootProps, getInputProps }) => (
        <FlexBetween>
          <Box
            {...getRootProps()}
            border={`2px dashed ${palette.primary.main}`}
            p="1rem"
            width="100%"
            sx={{ "&:hover": { cursor: "pointer" } }}>
            <input {...getInputProps()} />
            {!Clip ? (
              <p>Add Audio Here</p>
            ) : (
              <FlexBetween>
                <Typography>{Audio.name}</Typography>
                <EditOutlined />
              </FlexBetween>
            )}
          </Box>
          {Audio && (
            <IconButton
              onClick={() => setAudio(null)}
              sx={{ width: "15%" }}>
              <DeleteOutlined />
            </IconButton>
          )}
        </FlexBetween>
      )}
    </Dropzone>
  </Box>
)}



<Divider sx={{ margin: "1.25rem 0" }} />





      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem" onClick={() => setIsClip(!isClip)}>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                Clip
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={() => setIsAttachment(!isAttachment)}>
              <AttachFileOutlined sx={{ color: mediumMain }} />

              <Typography color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              
              >Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem" onClick={() => setIsAudio(!isAudio)}>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}>
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
