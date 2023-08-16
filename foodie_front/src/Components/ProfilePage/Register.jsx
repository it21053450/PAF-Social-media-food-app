import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../config";

const UserRegistration = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
       
        const data = {
            "username": values.username,
            "email": values.email,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "profilePictureImageUrl": "convertToBase64(values.profilePictureImageUrl[0])",
            "address": values.address,
            "mobileNumber": values.mobileNumber
        }

      //  if (convertToBase64(values.profilePictureImageUrl)) {
            axios.post(`${config.baseUrl}/users`, data)
                .then((value) => {
                  
                    localStorage.setItem("uid",value.data.id)
                    localStorage.setItem("username",value.data.username)
                })
                .catch(err => {
                    console.log("create user failed"+err)


                })
       /// }//
    };

    const convertToBase64 = (file) => {
        console.log(file.type)
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
            return null;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64 = e.target.result;
            console.log("Base64 image: ", base64);
           // form.setFieldsValue({ profilePictureImageUrl: base64 });
          };
          reader.readAsDataURL(file);

        return null;
    }

    const customRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        return isJpgOrPng;
    };

    return (
        <div style={{ width: "50%", margin: "0 auto" }}>
            <h1>User Registration</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not a valid email!",
                        },
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your first name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your last name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Profile Picture">
                    <Form.Item
                        name="profilePictureImageUrl"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
                        noStyle
                    >
                        <Upload
                            customRequest={customRequest}
                            beforeUpload={beforeUpload}
                            listType="picture"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Please input your address!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mobile Number"
                    name="mobileNumber"
                    rules={[
                        {
                            required: true,
                            message: "Please input your mobile number!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserRegistration;

