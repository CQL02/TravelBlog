import { Box, Typography } from "@mui/material";
import Layout from "../../component/Layout";
import Link from "next/link";

const countriesList = [
  { name: "Antarctica", image: "/Antarctica.png" },
  { name: "Africa", image: "/Africa.png" },
  { name: "Asia", image: "/Asia.png" },
  { name: "Australia", image: "/Australia.png" },
  { name: "Europe", image: "/Europe.png" },
  { name: "North America", image: "North_America.png" },
  { name: "South America", image: "South_America.png" },
];

export default function country() {
  return (
    <Layout>
      {countriesList.map((data) => (
        <Link
          href={`/country/searchcountry?country=${data.name}`}
          key={data.id}
        >
          <Box className="country-box" key={data.name}>
            <img src={data.image} width="150" alt={data.name} />
            <Typography className="country-text">{data.name}</Typography>
          </Box>
        </Link>
      ))}
    </Layout>
  );
}
