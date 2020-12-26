import React, { useState } from 'react'
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@material-ui/core';
import { db } from '../../firebase';

const EditForm = (props) => {

    const listSize = ['S', 'M', 'L', 'XL'];
    const [listSizeUpdate, setListSizeUpdate] = useState([])
    const [priceNew, setPriceNew] = useState(null)

    const handleClickSize = size => {
        let temp = [...listSizeUpdate];
        temp.push(size)
        setListSizeUpdate(temp)
    }

    const handleSave = key => {
        if(listSizeUpdate[0] && priceNew) {
            db.collection('clothes')
                .doc(key)
                .update({
                    price: priceNew,
                    size: listSizeUpdate
                }).then(() => {
                    console.log('success')
                })
        }
    }

    return (
        <form>
            <FormGroup>
                <TextField
                    variant="filled"
                    label="Giá"
                    onChange={ e => setPriceNew(e.target.value)}
                />
                <span>Size</span>
                <div style={{display: 'flex'}}>
                    {
                        listSize.map((item, index) => {
                            return (
                                <FormControlLabel 
                                    control={
                                        <Checkbox
                                            checked={ listSizeUpdate.includes(item) }
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
                <Button 
                variant="contained" 
                color="primary"
                onClick={ () => handleSave(props.product.docKey)}
                >
                    Lưu
                </Button>
            </FormGroup>
        </form>
    )
}
export default EditForm;