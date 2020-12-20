import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AccordionDetails, AccordionSummary, Checkbox, Container, FormControlLabel, FormGroup, Grid, InputLabel, List, ListItem, Select, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Radio from '@material-ui/core/Radio';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Product from '../components/Product';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    breacrumbs: {
        padding: '1rem 2.5rem',
        background: '#fbfbfb',
    },
    navLink: {
        textDecoration: 'none',
        color: 'black',
        fontFamily: 'Quicksand',
        display: 'flex',
        fontSize: '14px',
        alignItems: 'center',
    },
    typography: {
        fontFamily: 'Quicksand',
        color: '#a3a3a3',
        fontSize: '14px',
    },
    container: {
        padding: '3rem 2.5rem',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            padding: '1rem',
        }
    },
    navItemMenu: {
        padding: '0.5rem 0',
        borderBottom: '1px dashed #d2d2d2',
        '&:last-child': {
            borderBottom: 'none',
        }
    },
    navLinkMenu: {
        textDecoration: 'none',
        color: 'black',
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        width: '100%',
    },
    sideBar: {
        width: '350px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    radio: {
        marginRight: 10,
        color: 'black',
        fontSize: '0.2rem',
    },
    accordion: {
        boxShadow: 'none',
    },
    typographyRadio: {
        fontSize: '14px',
        color: '#5b5b5b',
    },
    listProduct: {
        padding: '0 2rem',
        [theme.breakpoints.down('sm')]: {
            padding: '2rem 0',
        }
    },
    formSelect: {
        marginRight: 0,
        marginLeft: 'auto',
    },
    accordionMobile: {
        boxShadow: 'none',
    },
    accordionSummaryMobile: {
        background: '#f2f5fa',
    },
    titleMobile: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        fontSize: '0.9rem'
    },
    listItemMobile: {
        width: '100%',
    },
    titleProducts: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.1rem',
        }
    }
}));

const ListProducts = () => {

    const classes = useStyles();

    const [radioValue, setRadioValue] = React.useState(null);
    const [selectValue, setSelectValue] = React.useState(null);
    const [size, setSize] = React.useState(null);
    let widthScreen = window.innerWidth;

    const handleChangeRadio = (e) => {
        setRadioValue(e);
    };
    const handleChangeSelect = (e) => {
        setSelectValue(e.target.value)
    }
    const handleChangeSize = e => {
        setSize(e.target.name)
    }

    return (
        <section>
            <Grid container className={classes.breacrumbs}>
                <Grid item lg={12} xs={12}>
                    <Breadcrumbs>
                        <Link 
                            to='/'
                            className={classes.navLink}
                        >
                            <HomeIcon />
                            Trang chủ
                        </Link>
                        <Link 
                            to='/' 
                            className={classes.navLink}
                        >
                            Sản phẩm
                        </Link>
                        <Typography className={classes.typography}>
                            Tất cả sản phẩm
                        </Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Container className={classes.container}>
                <div className={classes.sideBar}>
                    <Accordion 
                        className={classes.accordionMobile} 
                        style={{ marginBottom: '0.5rem' }}
                        defaultExpanded={ widthScreen >= 960 ? true : false }
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className={classes.accordionSummaryMobile}
                        >
                            <Typography className={classes.titleMobile} component="p">
                                DANH MỤC
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List className={classes.listItemMobile}>
                                <ListItem className={classes.navItemMenu}>
                                    <Link 
                                        to='/'
                                        className={classes.navLinkMenu}
                                    >
                                        SẢN PHẨM
                                    </Link>
                                </ListItem>
                                <ListItem className={classes.navItemMenu}>
                                    <Link 
                                        to='/'
                                        className={classes.navLinkMenu}
                                    >
                                        SẢN PHẨM
                                    </Link>
                                </ListItem>
                                <ListItem className={classes.navItemMenu}>
                                    <Link 
                                        to='/'
                                        className={classes.navLinkMenu}
                                    >
                                        SẢN PHẨM
                                    </Link>
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordionMobile} defaultExpanded={ widthScreen >= 960 ? true : false }>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className={classes.accordionSummaryMobile}
                        >
                            <Typography className={classes.titleMobile} component="p">
                                BỘ LỌC SẢN PHẨM
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ flexDirection: 'column' }}>
                            <Accordion className={classes.accordion} defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{padding: 0}}
                                >
                                    <Typography>
                                        Giá sản phẩm
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{padding: 0}}>
                                    <List>
                                        <ListItem 
                                            style={{padding: '0', cursor: 'pointer'}}
                                            onClick={() => handleChangeRadio('a')}
                                        >
                                            <Radio 
                                                className={classes.radio}
                                                checked={radioValue === 'a'}
                                                color="primary"
                                            />
                                            <Typography component="p" className={classes.typographyRadio}>
                                                Dưới 500.000 đ
                                            </Typography>
                                        </ListItem>
                                        <ListItem 
                                            style={{padding: '0', cursor: 'pointer'}}
                                            onClick={() => handleChangeRadio('b')}
                                        >
                                            <Radio 
                                                className={classes.radio}
                                                checked={radioValue === 'b'}
                                                color="primary"
                                            />
                                            <Typography component="p" className={classes.typographyRadio}>
                                                500.000 đ - 1.000.000 đ
                                            </Typography>
                                        </ListItem>
                                        <ListItem 
                                            style={{padding: '0', cursor: 'pointer'}}
                                            onClick={() => handleChangeRadio('c')}
                                        >
                                            <Radio 
                                                className={classes.radio}
                                                checked={radioValue === 'c'}
                                                color="primary"
                                            />
                                            <Typography component="p" className={classes.typographyRadio}>
                                                Trên 1.000.000 đ
                                            </Typography>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion} defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{padding: 0}}
                                >
                                    <Typography>
                                        Kích thước
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{padding: 0}}>
                                    <FormGroup style={{display: 'flex', flexDirection: 'row'}}>
                                        <FormControlLabel 
                                            control={
                                                <Checkbox
                                                    checked={size === 'S'}
                                                    onClick={handleChangeSize}
                                                    name="S"
                                                    color="primary"
                                                />
                                            }
                                            label="S"
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox
                                                    checked={size === 'M'}
                                                    onClick={handleChangeSize}
                                                    name="M"
                                                    color="primary"
                                                />
                                            }
                                            label="M"
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox
                                                    checked={size === 'L'}
                                                    onClick={handleChangeSize}
                                                    name="L"
                                                    color="primary"
                                                />
                                            }
                                            label="L"
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox
                                                    checked={size === 'XL'}
                                                    onClick={handleChangeSize}
                                                    name="XL"
                                                    color="primary"
                                                />
                                            }
                                            label="XL"
                                        />
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <Grid container className={classes.listProduct}>
                    <Grid item xs={12} style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                        <Typography variant="h5" className={classes.titleProducts}>
                            Tất cả sản phẩm
                        </Typography>
                        <FormControl className={classes.formSelect}>
                            <InputLabel>Sắp xếp</InputLabel>
                            <Select
                                native
                                value={selectValue}
                                onChange={handleChangeSelect}
                            >
                                <option aria-label="None" value="" />
                                <option value={0}>Giá: Giảm dần</option>
                                <option value={1}>Giá: Tăng dần</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} md={4} xs={6}>
                        <Product />
                    </Grid>
                    <Grid item lg={3} md={4} xs={6}>
                        <Product />
                    </Grid>
                    <Grid item lg={3} md={4} xs={6}>
                        <Product />
                    </Grid>
                    <Grid item lg={3} md={4} xs={6}>
                        <Product />
                    </Grid>
                    <Grid item lg={3} md={4} xs={6}>
                        <Product />
                    </Grid>
                    <Grid item lg={3} md={4} xs={6}>
                        <Product />
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}

export default ListProducts;