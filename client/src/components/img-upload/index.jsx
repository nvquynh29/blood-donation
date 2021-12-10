import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { env } from "../../../next.config"


const UploadAndDisplayImage = ({ props }) => {
    const [selectedImage, setSelectedImage] = useState(props.url);

    return (
        <>
            <Form.Item
                label='Ảnh tổ chức'
                name='img_path' >
                {selectedImage && (
                    <div>
                        <img alt="not fount" style={{ height: '500px' }} src={selectedImage.name ?
                            URL.createObjectURL(selectedImage) : `${env.API_URL}/getFile?img_path=${selectedImage}`} />
                        <br />
                        <Button onClick={() => { setSelectedImage(null) }}>Xóa</Button>
                    </div>
                )}
                <br />
                <Input
                    id='img_path'
                    type="file"
                    onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                    }}
                />
            </Form.Item>
        </>
    );
};

export default UploadAndDisplayImage;