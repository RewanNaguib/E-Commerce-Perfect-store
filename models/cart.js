module.exports=function Cart(oldCart){
    this.items=oldCart.items|| {};
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;

    this.add=function(item,id){
       var storedItem=this.items[id];
        if(!storedItem){
            
            storedItem=this.items[id]={productname:item.product_name,price:item.price,img:item.img,quantity:0,id:item.id,desc:item.description};
    
        }
        
        
           // console.log("mada5ltsh hena leh");
            storedItem.quantity++;
            storedItem.price=storedItem.price;
             this.totalQty++;
             this.totalPrice+=storedItem.price;
       // console.log(this.item);
        
    };
    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    this.generateArray=function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
}