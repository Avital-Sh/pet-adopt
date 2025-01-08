import { Button } from '@mui/material';
import { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import * as S from './ImageUploader.styles'
import NoImage from './no-image.png'
import { petsQueries } from '../../query/PetsQuery';

interface props {
  setImageId: (imageId: number) => void
}
const ImageUploader = ({ setImageId }: props) => {
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const { mutate } = petsQueries.usePostImageUpload();
  const [images, setImages] = useState<ImageListType>([]);
  const maxNumber = 69;
  const onChange = (imageList: ImageListType, _: number[] | undefined) => {
    setImages(imageList);
  };

  return <ImageUploading
    multiple
    value={images}
    onChange={onChange}
    maxNumber={maxNumber}
    dataURLKey="data_url"
  >
    {
      ({
        imageList,
        onImageUpload,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (

        // write your building UI
        <S.ImageUploadContainer className="upload__image-wrapper">
          <Button
            size='small'
            disabled={imageList.length > 0}
            variant='contained'
            color='success'
            style={isDragging ? { color: 'red' } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Add you pet Image here
          </Button>
          <S.ImageAndUploadContainer>
            {imageList.length === 0 ? <img src={NoImage} alt='pet-image' width={200} height={200} /> : imageList.map((image, index) => (
              <div key={index} className="image-item">
                <S.Image src={image['data_url']} alt="" />

                {!isUploaded ? <div className="image-item__btn-wrapper" style={{ display: "flex", gap: "2px", justifyContent: "space-between" }}><Button variant='contained' onClick={() => {

                  const imageData = new FormData();
                  imageData.append('file', image.file ?? new Blob());
                  mutate(imageData, {
                    onSuccess: (data) => {
                      setImageId(data.imageId)
                      setIsUploaded(true)
                    }
                  });
                }}>Upload</Button>
                  <Button variant='contained' color='warning' onClick={() => {
                    setIsUploaded(false);
                    onImageRemove(index)
                  }}>Remove</Button>
                </div> : <div style={{ display: "flex", flexDirection: "column" }}>
                  <S.SuccessMessage>Uploaded successfully</S.SuccessMessage>
                  <Button variant='contained' color='warning' onClick={() => {
                    setIsUploaded(false);
                    onImageRemove(index)
                  }}>Remove</Button>
                </div>}

              </div>

            ))}
          </S.ImageAndUploadContainer>
        </S.ImageUploadContainer>
      )}
  </ImageUploading >
}

export default ImageUploader