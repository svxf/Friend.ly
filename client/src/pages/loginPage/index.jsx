import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import FlexBetween from "components/FlexBetween";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      {/* <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Friend.ly
        </Typography>
      </Box> */}
      <FlexBetween sx={{ filter: `drop-shadow(0 -4px 0.75rem rgb(18, 18, 20))` }} position='sticky' top='0' paddingInline='1rem' backgroundColor={'rgb(255,255,255)'} zIndex='100' height='4rem' boxSizing='content-box'>
        <FlexBetween gap='1.75rem' width='100%' sx={{ justifyContent: 'center' }}>
            <FlexBetween sx={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
            }}
            >
                <svg style={{ height: '1.5rem', width: '1.5rem' }} viewBox="0 0 24 24" focusable="false"><g><path d="M4.5 2a2 2 0 0 1 3-1.7L23 9.6a2 2 0 0 1 0 3.5L7.6 22.4a2 2 0 0 1-3-1.7V2Z" fill="url(#a-iid-3)"></path><path d="M0 2A2 2 0 0 1 3 .3l15.5 9.3a2 2 0 0 1 0 3.5L3.1 22.4A2 2 0 0 1 0 20.7V2Z" fill="url(#b-iid-3)"></path></g><defs><linearGradient id="a-iid-3" x1=".2" y1="2.8" x2="19.3" y2="18.5" gradientUnits="userSpaceOnUse"><stop stopColor="#F06292"></stop><stop offset="1" stopColor="#FF3A81"></stop></linearGradient><linearGradient id="b-iid-3" x1="-4.4" y1="2.8" x2="19.5" y2="11.3" gradientUnits="userSpaceOnUse"><stop stopColor="#5DA2F2"></stop><stop offset="1" stopColor="#715BF7" stopOpacity=".8"></stop></linearGradient></defs></svg>
                <Typography sx={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    lineHeight: '1.2',
                    color: 'currentColor'
                }} >Friend.ly</Typography>
                <Typography sx={{ color: 'currentColor', fontSize: '70%', lineHeight: '0', position: 'relative', verticalAlign: 'baseline', top: '-0.5em', marginTop: '0px', marginInline: '0 0px', marginBottom: '0px' }}>Beta</Typography>
            </FlexBetween>
        </FlexBetween>
      </FlexBetween>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Friend.ly, a new social media platform!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;