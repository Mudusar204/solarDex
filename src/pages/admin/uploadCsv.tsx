import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

export default function UploadCsv() {
  const [msg, setMsg] = useState({
    password: "Please Enter Your Password",
    file: "Please Select A File",
  });
  const [isInvalid, setIsInvalid] = useState({
    password: false,
    file: false,
  });
  const [formData, setFormData] = useState({
    password: "",
    file: "",
  });
  const [file, setFile] = useState<any>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = () => {
    console.log(formData);
    // return;
    if (password === "") {
      setMsg({
        ...msg,
        password: "This Field Is Required",
      });
      setIsInvalid({
        ...isInvalid,
        password: true,
      });
    }
    if (file === "") {
      setMsg({
        ...msg,
        file: "This Field Is Required",
      });
      setIsInvalid({
        ...isInvalid,
        file: true,
      });
    }
    const data = new FormData();
    data.append("file", file);
    data.append("password", password);

    const formDataArray = Array.from(data.entries());

    console.log("formDataArray => ", formDataArray);

    fetch("https://solar-dex-airdrops.vercel.app/api/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (!res.status) {
          return toast.error(res.error);
        } else {
          return toast.success(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  return (
    <div>
      <Container style={{ marginTop: "5rem" }}>
        <Row>
          <Col style={{ marginBottom: "3rem" }}>
            <h1>Upload CSV</h1>
          </Col>
        </Row>

        <Form>
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input
              id="exampleFile"
              name="file"
              type="file"
              invalid={isInvalid.file}
              onChange={(e) => setFile(e.target.files?.[0] || "")}
            />
            <FormFeedback invalid={isInvalid.file}>{msg.file}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              type="text"
              invalid={isInvalid.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormFeedback invalid={isInvalid.password}>
              {msg.password}
            </FormFeedback>
          </FormGroup>
          <Button
            onClick={handleSubmit}
            type={"button"}
            className={"btn btn-primary mt-3"}
          >
            Submit
          </Button>
        </Form>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
