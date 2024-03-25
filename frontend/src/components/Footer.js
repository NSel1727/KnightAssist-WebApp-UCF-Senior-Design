import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', minWidth: '100%', bgcolor: '#5B526F', marginTop: 'auto'}}>
      <Container maxWidth="xl" sx={{p: 3}}>
        <Typography variant="body2" color="white" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://knightassist-43ab3aeaada9.herokuapp.com/">
            KnightAssist
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}
