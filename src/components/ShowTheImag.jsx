import { Box } from '@mui/material';
import React from 'react'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:"20px"
};
const ShowTheImag = ({previewImage}) => {
  return (
    <Box component={'div'} sx={style} display={'flex'} justifyContent={'center'} alignItems={'center'} >
      <Box component={'img'} src={previewImage} height={300} width={300} borderRadius={3}/>
    </Box>
  )
}

export default ShowTheImag