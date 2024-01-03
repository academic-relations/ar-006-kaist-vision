import { Container, Heading, Wrap } from "@chakra-ui/react";
import axios from "axios";
import { host } from "./utils";

export default async function Home() {
  const articles = await getVolume();

  return (
    <Container>
      <Wrap>{articles.map()}</Wrap>
    </Container>
  );
}

async function getVolume() {
  const res = await axios.get(`${host}/api/article`);
  return res.data;
}
