import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, Paper, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { storage, db } from '../../firebase'
import Slug from '../../Slug'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5rem'
    }
}));

const AddNewProduct = () => {

    const classes = useStyles()

    const [category, setCategory] = useState(null)
    const listCategory = ['Quần', "Áo dài", "Áo ngắn"]
    const listSize = ['S', 'M', 'L', 'XL'];
    const [listSizeChoose, setListSizeChoose] = useState([])
    const [listImg, setListImg] = useState([])
    const [nameProduct, setNameProduct] = useState(null)
    const [price, setPrice] = useState(null)

    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleClickSize = size => {
        let temp = [...listSizeChoose];
        temp.push(size)
        setListSizeChoose(temp)
    }
    const handleUploadImage = e => {
        if(e.target.files[0]) {
            let temp = []
            for(let img of e.target.files) {
                temp.push(img)
            }
            setListImg(temp)
        }
    }
    const makeId = length => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const handleAddProduct = () => {
        let listImgUrl = []
        if(category && listSizeChoose && listImg && nameProduct && price && listSizeChoose) {
            listImg.forEach(image => {
                const uploadImg = storage.ref(`images/${image.name}`)
                                        .put(image)
                uploadImg.on(
                    'state_changed',
                    snapshot => {},
                    error => {
                        console.log(error)
                    },
                    () => {
                        storage.ref('images')
                                .child(image.name)
                                .getDownloadURL()
                                .then(url => {
                                    listImgUrl.push(url)
                                    if(listImgUrl.length === 2) {
                                        db.collection('clothes')
                                            .doc()
                                            .set({
                                                codeProduct: makeId(7),
                                                imgUrl: [...listImgUrl],
                                                nameCategory: category,
                                                pathCategory: Slug(category),
                                                nameProduct,
                                                price: parseInt(price),
                                                size: [...listSizeChoose]
                                            }).then(() => {
                                                alert('Success!')
                                                setCategory(null)
                                                setListSizeChoose([])
                                                setListImg([])
                                                setNameProduct(null)
                                                setPrice(null)
                                            })
                                    }
                                })
                    }
                )
            })
        }
    }

    return (
        <Paper className={classes.root}>
            <TextField
                variant="filled"
                label="Tên sản phẩm"
                type="text"
                onChange={ e => setNameProduct(e.target.value)}
                style={{margin: '10px 0'}}
            />
            <TextField
                variant="filled"
                label="Giá"
                type="number"
                onChange={ e => setPrice(e.target.value)}
                style={{margin: '10px 0'}}
            />
            <FormControl style={{margin: '10px 0'}}>
                <InputLabel htmlFor="age-native-simple">Danh mục</InputLabel>
                <Select
                    native
                    value={category}
                    onChange={ (e) => handleChangeCategory(e) }
                >
                <option aria-label="None" value="" />
                {
                    listCategory.map((category, index) => {
                        return (
                            <option key={index} value={category}>{category}</option>
                        )
                    })
                }
                </Select>
            </FormControl>
            <div style={{display: 'flex', margin: '10px 0'}}>
                {
                    listSize.map((item, index) => {
                        return (
                            <FormControlLabel 
                                control={
                                    <Checkbox
                                        checked={ listSizeChoose.includes(item) }
                                        name={item}
                                        color="primary"
                                    />
                                }
                                label={item}
                                key={index}
                                onClick={ () => handleClickSize(item) }
                            />
                        )
                    })
                }
            </div>
            <div>
                <input
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={ handleUploadImage }
                    style={{margin: '10px 0'}}
                />
            </div>
            <Button 
                variant="contained" 
                color="primary"
                onClick={ () => handleAddProduct() }
                style={{margin: '10px 0'}}
            >
                Thêm 
            </Button>
        </Paper>
    )
}
export default AddNewProduct;