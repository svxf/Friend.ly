import { useState } from 'react';
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogin, setLogout } from 'state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const highlight = theme.palette.primary.highlight;
    const alt = theme.palette.background.alt;
    const altOpacity = theme.palette.background.altOpacity;
    
    const fullName = `${user.firstName} ${user.lastName}`;

    return (
    <>
    <FlexBetween sx={{ filter: `drop-shadow(0 -4px 0.75rem rgb(18, 18, 20))` }} position='sticky' top='0' paddingInline='1rem' backgroundColor={alt} zIndex='100' height='4rem' boxSizing='content-box'>
        <FlexBetween gap='1.75rem' width='25%'>
            <FlexBetween sx={{
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                position: 'relative',
                '&:hover': {
                    color: highlight,
                    cursor: 'pointer'
                }
            }}
            >
                <svg style={{ height: '1.5rem', width: '1.5rem' }} viewBox="0 0 24 24" focusable="false"><g><path d="M4.5 2a2 2 0 0 1 3-1.7L23 9.6a2 2 0 0 1 0 3.5L7.6 22.4a2 2 0 0 1-3-1.7V2Z" fill="url(#a-iid-3)"></path><path d="M0 2A2 2 0 0 1 3 .3l15.5 9.3a2 2 0 0 1 0 3.5L3.1 22.4A2 2 0 0 1 0 20.7V2Z" fill="url(#b-iid-3)"></path></g><defs><linearGradient id="a-iid-3" x1=".2" y1="2.8" x2="19.3" y2="18.5" gradientUnits="userSpaceOnUse"><stop stopColor="#F06292"></stop><stop offset="1" stopColor="#FF3A81"></stop></linearGradient><linearGradient id="b-iid-3" x1="-4.4" y1="2.8" x2="19.5" y2="11.3" gradientUnits="userSpaceOnUse"><stop stopColor="#5DA2F2"></stop><stop offset="1" stopColor="#715BF7" stopOpacity=".8"></stop></linearGradient></defs></svg>
                <Typography onClick={() => navigate("/home")} sx={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    lineHeight: '1.2',
                    color: 'currentColor'
                }} >Friend.ly</Typography>
                <Typography sx={{ color: 'currentColor', fontSize: '70%', lineHeight: '0', position: 'relative', verticalAlign: 'baseline', top: '-0.5em', marginTop: '0px', marginInline: '0 0px', marginBottom: '0px' }}>Beta</Typography>
            </FlexBetween>
        </FlexBetween>
        <FlexBetween gap='1.75rem' width='30%' position='relative'>
            {isNonMobileScreens && (
                <FlexBetween sx={{ borderColor: neutralLight }} position='relative' width='100%' height='40px' backgroundColor={'rgba(255,255,255,0.04)'} border={'1px solid'} paddingInline='1.5rem' borderRadius='0.375rem' gap='3rem'>
                    <InputBase placeholder='Search...' />
                    <IconButton sx={{ color: '#38a169', border: '1px solid currentcolor', borderRadius: '0.375rem', position: 'absolute', right: '0' }} >
                        <Search />
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>
        {/* Desktop */}
        {isNonMobileScreens ? (
            <FlexBetween gap='2rem' width='25%'>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkMode sx={{ fontSize: '25px' }} />
                    ) : (
                        <LightMode sx={{ fontSize: '25px', color: dark }} />
                    )}
                </IconButton>
                <Message sx={{ fontSize: '25px' }} />
                <Notifications sx={{ fontSize: '25px' }} />
                <Help sx={{ fontSize: '25px' }} />
                <FormControl variant='standard' value={fullName}>
                    <Select value={fullName} sx={{
                        backgroundColor: neutralLight,
                        width: '150px',
                        borderRadius: '0.25rem;',
                        p: '0.25rem 1rem',
                        '& .MuiSvgIcon-root:': {
                            pr: '0.25rem',
                            width: '3rem'
                        },
                        '& .MuiSelect-select:focus': {
                            backgroundColor: neutralLight
                        }
                    }}
                        input={<InputBase />}
                    >
                    
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogout())}>
                            Log Out
                        </MenuItem>
                    </Select>
                </FormControl>
            </FlexBetween>
        ) : (
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Menu />
            </IconButton>
        )}

        {/* Mobile */}
        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box
                position='fixed'
                right='0'
                bottom='0'
                height='100%'
                zIndex='100'
                maxWidth='500px'
                minWidth='300px'
                backgroundColor={alt}
            >
                <Box display='flex' justifyContent='flex-end' p='1rem'>
                    <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                        <Close />
                    </IconButton>
                </Box>

                {/* Menu Items */}
                <FlexBetween sx={{ backgroundColor: alt }} display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='3rem'>
                    <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: '25px' }}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkMode sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightMode sx={{ fontSize: '25px', color: dark }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: '25px' }} />
                    <Notifications sx={{ fontSize: '25px' }} />
                    <Help sx={{ fontSize: '25px' }} />
                    <FormControl variant='standard' value={fullName}>
                        <Select value={fullName} sx={{
                            backgroundColor: neutralLight,
                            width: '150px',
                            borderRadius: '0.25rem;',
                            p: '0.25rem 1rem',
                            '& .MuiSvgIcon-root:': {
                                pr: '0.25rem',
                                width: '3rem'
                            },
                            '& .MuiSelect-select:focus': {
                                backgroundColor: neutralLight
                            }
                        }}
                            input={<InputBase />}
                        >
                        
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>
            </Box>
        )}
    </FlexBetween>
    <FlexBetween zIndex={-1} position='fixed' width='100%' height='320px' sx={{ WebkitMaskImage: 'radial-gradient(farthest-side at 33% 12%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.63) 48%, rgba(0, 0, 0, 0.58) 90%, rgba(0, 0, 0, 0) 100%)', WebkitMaskSize: '150% 132%', WebkitMaskPosition: 'left bottom' }}>
        <img style={{ position: 'absolute', width: '100%', height: '100%', filter: 'blur(8px)', top: '-8px', background: 'url("https://i.ytimg.com/vi/jd8nzt4l3is/sddefault.jpg") center center / cover' }} />
    </FlexBetween>
    </>
    );
}

export default Navbar;