import React from 'react'
import formatMoney from '../../formatMoney';
import { Button } from '@material-ui/core';
import EditForm from './EditForm'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { db } from '../../firebase'

const Product = (props) => {

    const [isEdit, setIsEdit] = React.useState(true)
    const handleClickEdit = () => {
        setIsEdit(!isEdit)
    }
    const handleClickRemove = key => {
        db.collection('clothes')
            .doc(key)
            .delete()

    }

    return (
        <TableRow>
            <TableCell align="left">{props.nameProduct}</TableCell>
            <TableCell align="left">{formatMoney(props.price.toString())}</TableCell>
            <TableCell align="left">{props.nameCategory}</TableCell>
            <TableCell>
                {
                    isEdit ? (
                        <>
                        <Button 
                            color='primary' 
                            variant="contained"
                            onClick={ () => handleClickEdit() }
                        >
                            Sửa
                        </Button>
                        <Button 
                        color='secondary' 
                        variant="contained" 
                        style={{marginLeft: 10}}
                        onClick={ () => handleClickRemove(props.docKey)}
                        >
                            Xóa
                        </Button>
                        </>
                    ) : (<>
                        <Button 
                            variant="contained" 
                            color="secondary"
                            style={{marginLeft: 10}}
                            onClick={ () => handleClickEdit() }
                        >
                            Hủy
                        </Button>
                    </>)
                }
            </TableCell>
            <TableCell>
                {
                    isEdit ? '' : <EditForm product={props}/>
                }
            </TableCell>
        </TableRow>
    )
}

export default Product;