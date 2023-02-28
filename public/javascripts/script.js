function addToCart(prodId){
    $.ajax({
        url:'/add-to-Cart/'+prodId,
        method:'get',
        success:(response)=>{
         if(response.status){
           let count=$('#cart-count').html()
           count=parseInt(count)+1
           $('#cart-count').html(count)
         }
        }
    })
 
     }