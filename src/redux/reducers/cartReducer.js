import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState'

export default function cartReducer(state = initialState.cart, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            //ürün sepete eklenmişse sayısını güncellemeliyiz..
            var addedItem = state.find(c => c.product.id === action.payload.product.id);
            if (addedItem) {
                var newState = state.map(cartItem => {
                    if (cartItem.product.id === action.payload.product.id) {
                        return Object.assign({}, addedItem, { quantity: addedItem.quantity + 1 })
                    }
                    return cartItem;
                })
                return newState;

            } else {
                return [...state, { ...action.payload }] //Arrayin kopyasını alıp ekliyoruz.Reduxta direk push pop işlemi yapmıyoruz.
            }
            case actionTypes.REMOVE_FROM_CART:
                // const newState2 = state.filter(f=> f.product.id !== action.payload.id)
                var deletedItem = state.find(c => c.product.id === action.payload.id);
                {console.log("DeletedItem:" + deletedItem.quantity)}
                if(deletedItem.quantity > 1){
                    {console.log("içerdee..1")}
                    var new_state = state.map(c=>{
                        if(c.product.id === action.payload.id){
                            {console.log("içerdee..2")}
                            return Object.assign({}, deletedItem, { quantity: deletedItem.quantity - 1 })
                        }
                        return c;
                    })
                    return new_state;
                }
                else{
                     const newState2 = state.filter(f=> f.product.id !== action.payload.id)
                     return  newState2;
                }
                
        default:
            return state;
    }

}