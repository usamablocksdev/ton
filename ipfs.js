const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NWNlMjc1NC1iYjhhLTRiZmEtYWU3Yi0yZjE4NjYwMmVmNTQiLCJlbWFpbCI6InVzYW1hLnplZXlvdUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDI0ZDZkYzk5M2FiZGJmOGU3NWUiLCJzY29wZWRLZXlTZWNyZXQiOiI1YzYyNTAzODE2YWM1Y2I5MDA1MmYwZGVhNGRhM2M2MzY4ZjZjNjNlMjFlYjdmNTA1MTBjMzgyMjQ5MGFkMjlhIiwiaWF0IjoxNzIxODAxMzA0fQ.FlbFaXikAtcAulKpRWs3R4yJyUcf7TAfEPYPoldNZhM";

const pinFileToIPFS = async () => {
  const formData = new FormData();
  const src = "My/File/Path";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
pinFileToIPFS();
