import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Check from '@mui/icons-material/Check';
import { changeLanguage } from '../i18n';
import TranslateIcon from '@mui/icons-material/Translate';

const Translate: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [lang, setLang] = React.useState<string>('en');
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLElement>) => {

        const selectedLang = event.currentTarget.getAttribute('data-lang');
      
        if (selectedLang) {
            changeLanguage(selectedLang);
            setLang(selectedLang);
        }

        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <TranslateIcon/>
            </Button>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose} data-lang="en">
                     <span style={{color: lang==="en" ? "blue" : "black"}}>English</span> 
                </MenuItem>
                <MenuItem onClick={handleClose} data-lang="fr">
                <span style={{color: lang==="fr" ? "blue" : "black"}}>French</span> 
                </MenuItem>
                <MenuItem onClick={handleClose} data-lang="es">
                <span style={{color: lang==="es" ? "blue" : "black"}}>Spanish</span> 
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Translate;
