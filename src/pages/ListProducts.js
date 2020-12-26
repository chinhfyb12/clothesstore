import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AccordionDetails, AccordionSummary, Checkbox, Container, FormControlLabel, FormGroup, Grid, InputLabel, List, ListItem, Select, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Radio from '@material-ui/core/Radio';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import FormControl from '@material-ui/core/FormControl';
import Slug from '../Slug';
import { db } from '../firebase';
import { useRouteMatch } from 'react-router-dom';
import Products from '../components/Products';
import { connect } from 'react-redux';

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
        textTransform: 'uppercase',
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
        flexDirection: 'column',
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
    },
}));

const ListProducts = (props) => {

    const classes = useStyles();

    const { path } = useRouteMatch();

    const [radioValue, setRadioValue] = React.useState(null);
    // const [selectValue, setSelectValue] = React.useState(null);
    const [size, setSize] = React.useState(null);

    const [products, setProducts] = React.useState([]);
    const [nameCategory, setNameCategory] = React.useState(null);

    const listCategory = ['quần', 'áo ngắn', 'áo dài'];
    const listSize = ['S', 'M', 'L', 'XL'];

    let widthScreen = window.innerWidth;

    const handleChangeRadio = (value) => {
        setRadioValue(value);
        setSize(null)
    };
    // const handleChangeSelect = (e) => {
    //     setSelectValue(e.target.value)
    // }
    const handleChangeSize = value => {
        setSize(value)
        setRadioValue(null)
    }

    useEffect(() => {
        if(size) {
            if(path.slice(path.lastIndexOf('/') + 1)) {
                props.changeStatusLoader()
                if(path.slice(path.lastIndexOf('/') + 1) === 'all') {
                    db.collection('clothes')
                    .where('size', 'array-contains-any', [size])
                    .get()
                    .then(snapshot => {
                        if(snapshot) {
                            const listProduct = snapshot.docs.map(product => {
                                return {
                                    ...product.data(),
                                    docKey: product.id
                                }
                            });
                            if(Slug(listProduct[0].nameCategory) === path.slice(path.lastIndexOf('/') + 1)) {
                                setNameCategory(listProduct[0].nameCategory)
                            }
                            setProducts(listProduct);
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                            props.changeStatusLoader()
                        }
                    }).catch(() => { props.changeStatusLoader() })
                } else {
                    db.collection('clothes')
                        .where('pathCategory', '==', path.slice(path.lastIndexOf('/') + 1))
                        .where('size', 'array-contains-any', [size])
                        .get()
                        .then(snapshot => {
                            if(snapshot) {
                                const listProduct = snapshot.docs.map(product => {
                                    return {
                                        ...product.data(),
                                        docKey: product.id
                                    }
                                });
                                if(Slug(listProduct[0].nameCategory) === path.slice(path.lastIndexOf('/') + 1)) {
                                    setNameCategory(listProduct[0].nameCategory)
                                }
                                setProducts(listProduct);
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                                props.changeStatusLoader()
                            }
                        }).catch(() => {
                            props.changeStatusLoader()
                        })
                }
            }
        }
    }, [size])

    useEffect(() => {
        if(path.slice(path.lastIndexOf('/') + 1)) {
            props.changeStatusLoader()
            if(path.slice(path.lastIndexOf('/') + 1) === 'all') {
                db.collection('clothes')
                .get()
                .then(snapshot => {
                    if(snapshot) {
                        const listProduct = snapshot.docs.map(product => {
                            return {
                                ...product.data(),
                                docKey: product.id
                            }
                        });
                        if(Slug(listProduct[0].nameCategory) === path.slice(path.lastIndexOf('/') + 1)) {
                            setNameCategory(listProduct[0].nameCategory)
                        }
                        setProducts(listProduct);
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                        props.changeStatusLoader()
                    }
                }).catch(() => { props.changeStatusLoader() })
            } else {
                db.collection('clothes')
                    .where('pathCategory', '==', path.slice(path.lastIndexOf('/') + 1))
                    .get()
                    .then(snapshot => {
                        if(snapshot) {
                            const listProduct = snapshot.docs.map(product => {
                                return {
                                    ...product.data(),
                                    docKey: product.id
                                }
                            });
                            if(Slug(listProduct[0].nameCategory) === path.slice(path.lastIndexOf('/') + 1)) {
                                setNameCategory(listProduct[0].nameCategory)
                            }
                            setProducts(listProduct);
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                            props.changeStatusLoader()
                        }
                    }).catch(() => {
                        props.changeStatusLoader()
                    })
            }
        }
    }, [])

    useEffect(() => {
        if(radioValue) {
            let operator = radioValue === 'a' ? '<=' : '>'
            if(path.slice(path.lastIndexOf('/') + 1)) {
                props.changeStatusLoader()
                if(path.slice(path.lastIndexOf('/') + 1) === 'all') {
                    db.collection('clothes')
                    .where('price', operator, 500000)
                    .get()
                    .then(snapshot => {
                        if(snapshot) {
                            const listProduct = snapshot.docs.map(product => {
                                return {
                                    ...product.data(),
                                    docKey: product.id
                                }
                            });
                            if(Slug(listProduct[0].nameCategory) === path.slice(path.lastIndexOf('/') + 1)) {
                                setNameCategory(listProduct[0].nameCategory)
                            }
                            setProducts(listProduct);
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                            props.changeStatusLoader()
                        }
                    }).catch(() => { props.changeStatusLoader() })
                } else {
                    db.collection('clothes')
                        .where('pathCategory', '==', path.slice(path.lastIndexOf('/') + 1))
                        .where('price', operator, 500000)
                        .get()
                        .then(snapshot => {
                            if(snapshot) {
                                const listProduct = snapshot.docs.map(product => {
                                    return {
                                        ...product.data(),
                                        docKey: product.id
                                    }
                                });
                                if(Slug(listProduct[0].nameCategory) === path.slice(path.lastIndexOf('/') + 1)) {
                                    setNameCategory(listProduct[0].nameCategory)
                                }
                                setProducts(listProduct);
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                                props.changeStatusLoader()
                            }
                        }).catch(() => {
                            props.changeStatusLoader()
                        })
                }
            }
        }
    }, [radioValue])

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
                            to='/all' 
                            className={classes.navLink}
                        >
                            Sản phẩm
                        </Link>
                        {
                            nameCategory ? (
                                <Typography variant="h5" className={classes.navLink}>
                                    { nameCategory }
                                </Typography>
                            ) : ''
                        }
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
                                {
                                    listCategory.map((item, index) => {
                                        return (
                                            <ListItem key={ index } className={classes.navItemMenu}>
                                                <Link 
                                                    to={ Slug(item) }
                                                    className={classes.navLinkMenu}
                                                >
                                                    { item }
                                                </Link>
                                            </ListItem>
                                        )
                                    })
                                }
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
                                                Trên 500.000 đ
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
                                        {
                                            listSize.map((item, index) => {
                                                return (
                                                    <FormControlLabel 
                                                        control={
                                                            <Checkbox
                                                                checked={size === item}
                                                                onClick={ () => handleChangeSize(item)}
                                                                name={item}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={item}
                                                        key={index}
                                                    />
                                                )
                                            })
                                        }
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <Grid container className={classes.listProduct}>
                    <div style={{display: 'flex', height: 'fit-content'}}>
                        {
                            nameCategory ? (
                                <Typography variant="h5" className={classes.titleProducts}>
                                    { nameCategory }
                                </Typography>
                            ) : (
                                <Typography variant="h5" className={classes.titleProducts}>
                                    Tất cả sản phẩm
                                </Typography>
                            )
                        }
                        {/* <FormControl className={classes.formSelect}>
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
                        </FormControl> */}
                    </div>
                    <Grid container>
                        <Products>
                            { products } 
                        </Products>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        changeStatusLoader: () => dispatch({type: "CHANGE_STATUS_LOADER"}) 
    }
}

export default connect(null, mapDispatchToProps)(ListProducts);