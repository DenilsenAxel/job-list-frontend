import React from "react";
import { Button, Form, Input } from "antd";
import { AuthContext } from "../context/AuthProvider";
import { IAuthRequest } from "../interfaces";
import { register } from "../api/auth";
import { toast } from "react-toastify";

export const Register = () => {
  const { onLogin } = React.useContext(AuthContext)!;

  const onFinish = async (value: IAuthRequest) => {
    const err = await register(value, onLogin!);
    if (err) {
      toast.warning("Already Registered");
      return;
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: "100%" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
