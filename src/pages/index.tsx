import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCustom from "@/pages/_navbar";
import { Button, Row, Col, Container } from "reactstrap";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
} from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { address, connector, isConnected } = useAccount();
  const connect = useConnect();
  const disconnect = useDisconnect();

  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  const [msg, setMsg] = useState<string>("");
  const [msgColor, setMsgColor] = useState<string>("black");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const checkAddress = async () => {
    console.log("Checking Address", isConnected);
    if (walletAddress === "") {
      setMsg("Please Enter A Wallet Address");
      setMsgColor("red");
      return;
    }
    try {
      const response = await fetch("/api/checkWalletAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(walletAddress),
      });
      const res = await response.json();
      console.log(res);
      if (res.status) {
        setMsg("You Are Eligible For The AirDrop");
        setMsgColor("green");
      } else {
        setMsg("You Are Not Eligible For The AirDrop");
        setMsgColor("red");
      }
    } catch (error) {
      setMsg("You Are Not Eligible For The AirDrop");
      setMsgColor("red");
      console.error("Error updating exchanges:", error);
    }
  };

  useEffect(() => {
    if (msg == "") {
      return;
    }
    setTimeout(() => {
      setMsg("");
    }, 3000);
  }, [msg]);

  return (
    <div style={{ color: "#B4B4B4" }}>
      <Head>
        <title>Solar Dex AirDrop</title>
        <meta name="description" content="Generated by create-wc-dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavbarCustom />
      <Container
        className={
          "text-center h-[calc(100vh-100px)] flex flex-col justify-center "
        }
      >
        {/* <Row>
          <Col className={"mt-5 box-tier"}>
            <h1>Tier 1</h1>
            <Button className={"mt-5 btn-bg"} disabled={true}>
              {" "}
              Claim{" "}
            </Button>
          </Col>
          <Col className={"mt-5 box-tier"}>
            <h1>Tier 2</h1>
            <Button className={"mt-5 btn-bg"} disabled={true}>
              {" "}
              Claim{" "}
            </Button>
          </Col>
        </Row> */}
        <div className="flex justify-center items-center ">
          <Image
            src="/logo-solar.svg"
            width="200"
            style={{ height: "100px", width: "100px" }}
            height="200"
            alt={"logo"}
          />
          {/* <br /> */}
          <h2 className="">Solar Airdrop Eligibility Checker </h2>
        </div>
        <Form>
          <FormGroup>
            <Input
              name="address"
              id="address"
              placeholder=" Paste Your Wallet Address Here"
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </FormGroup>
          <FormText>
            Questions about Allocation or Project?{" "}
            <a href={"https://t.me/solardexofficialchat"} target={"_blank"}>
              Join The Community Now
            </a>
          </FormText>
        </Form>
        <Button
          onClick={checkAddress}
          className={"mt-5 ml-auto mr-auto p-3 btn-bg "}
        >
          Check Airdrop Eligibility
        </Button>
        <p
          className={"mt-5"}
          style={{ color: msgColor, fontWeight: 600, fontSize: "20px" }}
        >
          {msg}
        </p>
      </Container>
    </div>
  );
}
