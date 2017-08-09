var body=$('body');
var overlay, modal;
var onloadImage=localStorage.getItem("images");
var newArray = JSON.parse(onloadImage)
if (onloadImage==null)
    var imgArray=[1,2,3,4,5,6,7,8,9,10,11,12];
else 
    var imgArray=newArray;

for (var i=0; i<imgArray.length; i++)
    {
        //console.log(i%3);
        if (i%3==0){
            if (imgArray[i]!=null)
                $('.Pictures').append('<div class="Pictures__item red__border"><img class="Pictures__item--image" src="image/'+imgArray[i]+'.jpg"><img class="close__img" src="image/close.png"></div>');}
        else
            {if (imgArray[i]!=null)
                $('.Pictures').append('<div class="Pictures__item"><img  class="Pictures__item--image" src="image/'+imgArray[i]+'.jpg"><img class="close__img" src="image/close.png"></div>');}
    }


$('.Pictures__item--image').click(function(){
    var img=$(this).prop('src');
    showModal(img);
});

$('.close__img').click(function(){
    var deleteImage=$( ".close__img" ).index( this );
    console.log(deleteImage);
    $(this).parent().css('display','none');
    $(this).parent().remove();
    imgArray.splice(deleteImage,1);
    console.log(imgArray);
    var imagesNew=JSON.stringify(imgArray);
    localStorage.setItem("images", imagesNew);

});

function showModal(img) {
    overlay=$('<div class="overlay"></div>');
    modal=$('<div class="modal"><img class="modal__img" src='+img+'><img class="modal__close" src="image/close.png"></div>');
    body.append(overlay);
    body.append(modal);
    $(overlay).click(function(){
        hideModal();
    });
    $('.modal__close').click(function(){
        hideModal();
    });
}

function hideModal() {
    modal.hide(function () {
		modal.remove();});	
	overlay.hide();
}


var date=new Date();

var day =date.getDate();
if (day < 10) day = '0' + day;

var month =date.getMonth()+1;
if (month < 10) month = '0' + month;

var year =date.getFullYear();

var hours=date.getHours();
if (hours < 10) hours = '0' + hours;

var minutes=date.getMinutes();
if (minutes < 10) minutes = '0' + minutes;

var newDate=day+'.'+month+'.'+year+' '+hours+':'+minutes;

document.querySelector('.date').innerHTML=newDate;

document.querySelector('.imgCount').innerHTML=document.querySelectorAll('.Pictures__item--image').length;

$('button').click(function(){
    localStorage.clear();
    window.location.reload();
});

