import React, { Component } from 'react'
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem,
    NavLink
} from '../../../node_modules/reactstrap'
import { connect } from 'react-redux'
import { Badge } from 'reactstrap'
import { bindActionCreators } from 'redux'
import * as cartAction from '../../redux/actions/cartActions'

class cartSummary extends Component {

    renderEmpty(){
        return(
         <NavItem>
            <NavLink >Empty!</NavLink>
         </NavItem>
        )
    }
    renderSummary(){
        return(
            <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Options
              </DropdownToggle>
                <DropdownMenu right>
                    { this.props.cart.map(c=> (
                        <DropdownItem key = {c.product.id}>
                            <Badge color="danger" onClick={() => this.props.actions.removeFromCart(c.product)}>Delete</Badge>
                            {c.product.productName}
                            <Badge color="success">{c.quantity}</Badge>
                        </DropdownItem>
                    ))}
                    </DropdownMenu>
                </UncontrolledDropdown>
        )
    }

    render(){
        return (
            <div>
                {console.log("asdas")}
                {
                    this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()
                }          
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: {
            removeFromCart : bindActionCreators(cartAction.removeFromCart,dispatch)
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(cartSummary);

