import React from 'react'
import { Typography } from "@mui/material"

const ProductDescription = ({ productDescription }) => {
  return (
    <div className="p-2 pb-6 px-4 mt-3 border-1">
        <Typography variant="h6" gutterBottom className="p-5 ">Product Description</Typography>
        <Typography variant='body1' className="p-5 ">{productDescription}</Typography>
    </div>
  )
}

export default ProductDescription;