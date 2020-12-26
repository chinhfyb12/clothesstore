import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../firebase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Product from './Product'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({

}))

const ListProduct = props => {

    const classes = useStyles()

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Sản phẩm</TableCell>
                        <TableCell align="left">Giá</TableCell>
                        <TableCell align="left">Danh mục</TableCell>
                        <TableCell align="left">Hành động</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.children.map((item, index) => {
                            return (
                                <Product key={index}
                                    nameProduct={item.nameProduct}
                                    price={item.price}
                                    nameCategory={item.nameCategory}
                                    docKey={item.docKey}
                                />
                            )
                        })
                    }
                </TableBody>
            </Table>
            </TableContainer>
    )
}

export default ListProduct