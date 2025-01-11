import { Box } from '@mui/material';
import React from 'react'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ShowTheImag = ({previewImage}) => {
  return (
    <Box component={'div'} sx={style}>
      <Box component={'img'} src={previewImage} height={300} width={300}/>
    </Box>
  )
}

export default ShowTheImag